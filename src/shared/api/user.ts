import HTTPTransport from '@/shared/core/api.ts';

const userApi = new HTTPTransport('/user');

export default class UserApi {
  async change(data): Promise<XMLHttpRequest> {
    return userApi.put('/profile', { data });
  }

  async password(data): Promise<XMLHttpRequest> {
    return userApi.put('/password', { data });
  }
}
