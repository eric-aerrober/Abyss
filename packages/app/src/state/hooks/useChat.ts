import { useDatabaseTableSubscription } from '../database-connection';

export function useChatWithModel(chatId: string) {
    // The chat record
    const chat = useDatabaseTableSubscription('Chat', async database => database.table.Chat.findUnique(chatId));

    // The thread record for the chat
    const thread = useDatabaseTableSubscription('MessageThread', async database =>
        database.table.MessageThread.findUnique(chat.data?.threadId || '')
    );

    // The messages for the thread
    const messages = useDatabaseTableSubscription('Message', async database => database.table.Message.forThread(thread.data?.id || ''));

    if (chat.loading || thread.loading || messages.loading) {
        return {
            loading: true,
        };
    }

    return {
        loading: false,
        chat: chat.data,
        thread: thread.data,
        messages: messages.data,
    };
}
