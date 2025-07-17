import HTTPTransport from '@/shared/core/api.ts';
import { IUser } from '@/shared/type';

const userApi = new HTTPTransport('/user');

export default class UserApi {
  async change(data: IUser): Promise<XMLHttpRequest> {
    return userApi.put('/profile', { data });
  }

  async password(data: Record<string, string>): Promise<XMLHttpRequest> {
    return userApi.put('/password', { data });
  }
}
