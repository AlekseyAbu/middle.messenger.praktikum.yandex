import HTTPTransport from '@/shared/core/api.ts';

const authApi = new HTTPTransport('/chats');

export default class ChatsApi {
  async listChats(): Promise<Response> {
    return authApi.get('/');
  }

  async createChat(data): Promise<Response> {
    return authApi.post('/', { data });
  }

  async addUser(): Promise<Response> {
    return authApi.post('/token');
  }

  async deleteUser(): Promise<Response> {
    return authApi.delete('/users');
  }
}
