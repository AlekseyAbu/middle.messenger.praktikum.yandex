import { WebSocketEvents, WebSocketTransport } from '@/shared/api/socket.ts';
import { IMessage } from '@/shared/type';
import * as chatServices from '@/shared/services/chats.ts';

export class MessagesController {
  private static transports: Map<number, WebSocketTransport> = new Map();

  static async connect(chatId: number, token: string) {
    if (this.transports.has(chatId)) {
      return;
    }
    const userId = window.store.getState().user?.id;

    const transport = new WebSocketTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this.transports.set(chatId, transport);

    await transport.connect();
    this.subscribe(transport, chatId);
    this.fetchOldMessages(chatId);
  }

  static async sendMessage(chatId: number, message: string) {
    const transport = this.transports.get(chatId);
    if (!transport) {
      throw new Error(`Чат ${chatId} не подключён`);
    }

    if (message) {
      transport.send({
        type: 'message',
        content: message,
      });
    }
  }

  static fetchOldMessages(chatId: number) {
    const transport = this.transports.get(chatId);

    if (!transport) {
      throw new Error(`Чат ${chatId} не подключён`);
    }
    transport.send({
      type: 'get old',
      content: '0',
    });
  }

  static handleMessages(messages: IMessage[] | IMessage, chatId: number) {
    const incomingMessages = Array.isArray(messages) ? messages.reverse() : [messages];
    const currentMessages = window.store.getState().messages?.[chatId] ?? [];
    const allMessages = [...currentMessages, ...incomingMessages].filter((message) => message.type === 'message');
    window.store.set(`messages.${chatId}`, allMessages);
    if (!Array.isArray(messages)) {
      this.findMessages(chatId);
    }
    chatServices.getChats();
  }

  static findMessages(chatId: number) {
    const messages = window.store.getState().messages?.[chatId];
    window.store.set('currentMessages', messages);
  }

  static subscribe(transport: WebSocketTransport, chatId: number) {
    transport.on(WebSocketEvents.Message, (data) => {
      this.handleMessages(data, chatId);
    });
  }
}
