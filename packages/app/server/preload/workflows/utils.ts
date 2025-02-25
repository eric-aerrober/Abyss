import { Intelegence, OpenAIChatBasedLLM } from '@abyss/intelegence';
import { LanguageModel } from '@abyss/intelegence/src/interfaces/language';
import { ChatContext } from '@abyss/intelegence/src/utils/chat-context';
import { Chat, Message, ModelConnections } from '@prisma/client';

export function buildIntelegenceForChat(chat: Chat, aiConnection: ModelConnections) {
    let languageModel: LanguageModel | undefined;

    if (aiConnection.provider === 'OpenAi') {
        languageModel = new OpenAIChatBasedLLM({
            modelId: aiConnection.modelId,
            apiKey: (aiConnection.data as any)['apiKey'],
        });
    }

    if (!languageModel) {
        throw new Error('Unsupported AI provider');
    }

    return new Intelegence({
        language: languageModel,
    });
}

export function buildChatContext(messages: Message[]) {
    const context = ChatContext.fromStrings(messages.map(m => m.content));

    return context;
}
