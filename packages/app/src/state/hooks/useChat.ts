import { useDatabaseTableSubscription } from '../database-connection';

export function useChatWithModel(chatId: string) {
    // The chat record
    const chat = useDatabaseTableSubscription('Chat', async database => database.table.chat.findUnique(chatId));

    // The thread record for the chat
    const _getThread = async database => database.table.messageThread.findUnique(chat.data?.threadId || '');
    const thread = useDatabaseTableSubscription('MessageThread', _getThread, [chat.data?.threadId]);

    // The messages for the thread
    const _getMessages = async database => database.table.message.forThread(thread.data?.id || '');
    const messages = useDatabaseTableSubscription('Message', _getMessages, [thread.data?.id]);

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
