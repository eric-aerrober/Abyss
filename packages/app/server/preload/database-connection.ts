import { contextBridge } from 'electron';
import type { PrismaClient } from '@prisma/client';
import { createRequire } from 'module';
import { v4 as uuidv4 } from 'uuid';
import { ModelConnectionController } from './controllers/model-connections';
import { UserSettingsController } from './controllers/user-settings';
import { MessageThreadController } from './controllers/message-thread';
import { MessageController } from './controllers/message';
import { ApiCallController } from './controllers/api-call';
import { ChatController } from './controllers/chat';
import { RenderedThreadController } from './controllers/rendered-thread';
import { AskAiToRespondToChat } from './workflows/ask-ai-respond-thread';
import { AskAiToTitleConversation } from './workflows/ask-ai-to-title-conversation';

// Setup prisma to support sqlite
const require = createRequire(import.meta.url);
const prismaModule = require('@prisma/client') as {
    PrismaClient: new () => PrismaClient;
};
export const prisma = new prismaModule.PrismaClient();

// Allow subscriptions to database changes
interface DatabaseTableSubscriber {
    subscribers: string[];
    byRecord: Record<string, string[]>;
}
const subscribersById = new Map<string, DatabaseTableSubscriber>();
const subscriberRegistry = new Map<string, (data: any) => void>();

export function addTableSubscriber(table: string, handler: (data: any) => void) {
    const subscriberId = uuidv4();
    if (!subscribersById.has(table)) {
        subscribersById.set(table, { subscribers: [], byRecord: {} });
    }
    subscribersById.get(table)!.subscribers.push(subscriberId);
    subscriberRegistry.set(subscriberId, handler);
    return subscriberId;
}

export function addRecordSubscriber(table: string, recordId: string, handler: (data: any) => void) {
    const subscriberId = uuidv4();
    if (!subscribersById.has(table)) {
        subscribersById.set(table, { subscribers: [], byRecord: {} });
    }
    if (!subscribersById.get(table)!.byRecord[recordId]) {
        subscribersById.get(table)!.byRecord[recordId] = [];
    }
    subscribersById.get(table)!.byRecord[recordId].push(subscriberId);
    subscriberRegistry.set(subscriberId, handler);
    return subscriberId;
}

export function removeTableSubscriber(table: string, subscriberId: string) {
    if (!subscribersById.has(table)) {
        return;
    }
    subscribersById.get(table)!.subscribers = subscribersById.get(table)!.subscribers.filter(s => s !== subscriberId);
    subscriberRegistry.delete(subscriberId);
}

export function removeRecordSubscriber(table: string, recordId: string, subscriberId: string) {
    if (!subscribersById.has(table)) {
        return;
    }

    const tableSubscriber = subscribersById.get(table)!;
    const recordSubscribers = tableSubscriber.byRecord[recordId];
    if (!recordSubscribers) {
        return;
    }
    const filteredSubscribers = recordSubscribers.filter(s => s !== subscriberId);
    tableSubscriber.byRecord[recordId] = filteredSubscribers;

    subscriberRegistry.delete(subscriberId);
}

export function notifyTableChanged(table: string, recordId?: string) {
    if (!subscribersById.has(table)) {
        return;
    }
    const tableSubscriber = subscribersById.get(table)!;
    const subscribers = tableSubscriber.subscribers;

    for (const subscriberId of subscribers) {
        const subscriber = subscriberRegistry.get(subscriberId);
        if (subscriber) {
            subscriber({ table, recordId });
        }
    }

    if (!recordId) {
        return;
    }

    const recordSubscribers = tableSubscriber.byRecord[recordId];
    if (!recordSubscribers) {
        return;
    }

    for (const subscriberId of recordSubscribers) {
        const subscriber = subscriberRegistry.get(subscriberId);
        if (subscriber) {
            subscriber({ table, recordId });
        }
    }
}

const tableControllers = {
    modelConnections: ModelConnectionController,
    userSettings: UserSettingsController,
    messageThread: MessageThreadController,
    message: MessageController,
    apiCall: ApiCallController,
    renderedConversationThread: RenderedThreadController,
    chat: ChatController,
};

const PrismaAPI = {
    // Subscriber to table changes
    subscribeTable: (table: string, handler: (data: any) => void) => {
        return addTableSubscriber(table, handler);
    },
    subscribeRecord: (table: string, recordId: string, handler: (data: any) => void) => {
        return addRecordSubscriber(table, recordId, handler);
    },
    unsubscribeTable: (table: string, subscriberId: string) => {
        return removeTableSubscriber(table, subscriberId);
    },
    unsubscribeRecord: (table: string, recordId: string, subscriberId: string) => {
        return removeRecordSubscriber(table, recordId, subscriberId);
    },

    describeTables: async () => {
        const tableKeys = Object.keys(tableControllers);
        const tableStats: { name: string; recordCount: number }[] = [];

        for (const tableName of tableKeys) {
            const table = prisma[tableName];
            const count = await table.count();

            tableStats.push({
                name: tableName,
                recordCount: count,
            });
        }
        return tableStats;
    },

    // Access to database tables
    table: tableControllers,

    workflows: {
        respondToChat: AskAiToRespondToChat,
        titleConversation: AskAiToTitleConversation,
    },
};

contextBridge.exposeInMainWorld('prisma', PrismaAPI);
export type PrismaAPI = typeof PrismaAPI;
