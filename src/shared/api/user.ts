import HTTPTransport from '@/shared/core/api.ts';

const userApi = new HTTPTransport('/user');

export default class UserApi {
  async change(): Promise<XMLHttpRequest> {
    return userApi.put('/profile');
  }
}
