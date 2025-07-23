import HTTPTransport from '@/shared/core/api.ts';

const authApi = new HTTPTransport('/chats');

export default class ChatsApi {
  async listChats(): Promise<XMLHttpRequest> {
    return authApi.get('/');
  }

  async userInChat(id: number): Promise<XMLHttpRequest> {
    return authApi.get(`/${id}/users`);
  }

  async createChat(data: Record<string, any>): Promise<XMLHttpRequest> {
    return authApi.post('/', { data });
  }

  async deleteUser(): Promise<XMLHttpRequest> {
    return authApi.delete('/users');
  }

  async addUserInChat(data: Record<string, any>): Promise<XMLHttpRequest> {
    return authApi.put('/users', { data });
  }

  async deleteUserInChat(data: Record<string, any>): Promise<XMLHttpRequest> {
    return authApi.delete('/users', { data });
  }

  async pingTokenChats(id: number): Promise<XMLHttpRequest> {
    return authApi.post(`/token/${id}`);
  }
}
