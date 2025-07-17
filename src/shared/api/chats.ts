import * as zlib from 'node:zlib';
import HTTPTransport from '@/shared/core/api.ts';

const authApi = new HTTPTransport('/chats');

export default class ChatsApi {
  async listChats(): Promise<Response> {
    return authApi.get('/');
  }

  async userInChat(id): Promise<Response> {
    return authApi.get(`/${id}/users`);
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

  async addUserInChat(data): Promise<XMLHttpRequest> {
    return authApi.put('/users', { data });
  }

  async deleteUserInChat(data): Promise<XMLHttpRequest> {
    return authApi.delete('/users', { data });
  }

  async pingTokenChats(id): Promise<XMLHttpRequest> {
    return authApi.post(`/token/${id}`);
  }
}
