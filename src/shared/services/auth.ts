import { ROUTER } from '../constants/constants';
import AuthApi from '../api/auth';
import UserApi from '@/shared/api/user.ts';

const authApi = new AuthApi();
const userApi = new UserApi();

export const login = async (model) => {
  window.store.set({ isLoading: true });
  try {
    const response = await authApi.login(model);
    console.log(response, 'login in service');
    // window.router.go(ROUTER.chats);
  } catch (error) {
    console.log(error, JSON.parse(error).reason, 'responsError');
    // const error = await responsError.json();
    window.store.set({ loginError: JSON.parse(error).reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const register = async (model) => {
  window.store.set({ isLoading: true });
  try {
    const response = await authApi.create(model);
    console.log(response, 'register in service');
    const responseUsers = await authApi.me();
    window.store.set({ users: responseUsers });
    console.log(responseUsers, 'responseUsers');
    // window.router.go(ROUTER.chats);
  } catch (error) {
    console.log(error, JSON.parse(error).reason, 'responsError');
    // const error = await responsError.json();
    window.store.set({ loginError: JSON.parse(error).reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const exit = async () => {
  await authApi.logout();
  window.store.set({ user: null });
  window.router.go(ROUTER.auth);
};

export const checkLoginUser = async () => {
  window.store.set({ isLoading: true });
  try {
    const user = await authApi.me();
    console.log('hey');
    // window.router.go(ROUTER.chats);
    window.store.set({ user });
  } catch (responsError) {
    // const error = await responsError.json();
    // window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const changeUser = async (model) => {
  window.store.set({ isLoading: true });
  try {
    const response = await userApi.change(model);
    console.log(response, 'register in service');
    window.store.set({ users: response });
    // window.router.go(ROUTER.chats);
  } catch (error) {
    console.log(error, JSON.parse(error).reason, 'responsError');
    // const error = await responsError.json();
    window.store.set({ loginError: JSON.parse(error).reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};
