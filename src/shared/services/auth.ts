import { ROUTER } from '../constants/constants';
import AuthApi from '../api/auth';
import UserApi from '@/shared/api/user.ts';
import { IUser } from '@/shared/type';
import { CreateUser, LoginRequestData } from '@/shared/api/type.ts';

const authApi = new AuthApi();
const userApi = new UserApi();

export const login = async (model: LoginRequestData) => {
  (window as any).store.set({ isLoading: true });
  try {
    const response = await authApi.login(model);
    console.log(response, 'login in service');
    (window as any).router.go(ROUTER.chats);
  } catch (error) {
    if (JSON.parse((error as string)).reason === 'User already in system') {
      (window as any).router.go(ROUTER.chats);
    }
    console.error(error);
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};

export const register = async (model: CreateUser) => {
  (window as any).store.set({ isLoading: true });
  try {
    const response = await authApi.create(model);
    console.log(response, 'register in service');
    const responseUsers = await authApi.me();
    (window as any).store.set({ users: responseUsers });
    console.log(responseUsers, 'responseUsers');
    // (window as any).store.go(ROUTER.chats);
  } catch (error) {
    console.error(error);
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};

export const exit = async () => {
  await authApi.logout();
  (window as any).store.set({ user: null });
  (window as any).store.go(ROUTER.auth);
};

export const checkLoginUser = async () => {
  (window as any).store.set({ isLoading: true });
  try {
    const user = await authApi.me();
    // (window as any).store.go(ROUTER.chats);
    (window as any).store.set({ user });
  } catch (responsError) {
    console.error(responsError);
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};

export const changeUser = async (model: IUser) => {
  (window as any).store.set({ isLoading: true });
  try {
    const response = await userApi.change(model);
    console.log(response, 'register in service');
    (window as any).store.set({ users: response });
    // (window as any).store.go(ROUTER.chats);
  } catch (error) {
    console.error(error);
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};

export const changePassword = async (model: Record<string, any>) => {
  (window as any).store.set({ isLoading: true });
  try {
    await userApi.password(model);
  } catch (error) {
    console.error(error);
    // @ts-expect-error не нашел способ ее исправить
    (window as any).store.set({ loginError: JSON.parse(error).reason });
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};
