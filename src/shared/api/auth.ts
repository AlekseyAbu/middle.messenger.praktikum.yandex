import HTTPTransport from '../core/api';
import {
  APIError,
  CreateUser,
  LoginRequestData,
  SignUpResponse,
  UserDTO,
} from './type';

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
  async create(data: CreateUser): Promise<XMLHttpRequest> {
    return authApi.post<SignUpResponse>('/signup', { data });
  }

  async login(data: LoginRequestData): Promise<XMLHttpRequest> {
    return authApi.post('/signin', { data });

    // console.log(response, 'res');

    // return authApi.post('/signin', { data });
  }

  async me(): Promise<XMLHttpRequest> {
    return authApi.get('/user');
  }

  async logout(): Promise<XMLHttpRequest> {
    return authApi.post('/logout');
  }

  // console.log(response, 'res');

  // return authApi.post('/signin', { data });
  // async create(data: CreateUser): Promise<SignUpResponse> {
  //   return authApi.post<SignUpResponse>('/signup', { data });
  // }
  //
  // async login(data: LoginRequestData): Promise<void | APIError> {
  //   return authApi.post('/signin', { data });
  // }
  //
  // async me(): Promise<UserDTO | APIError> {
  //   return authApi.get('/user');
  // }
  //
  // async logout(): Promise<void | APIError> {
  //   return authApi.post('/logout');
  // }
}
