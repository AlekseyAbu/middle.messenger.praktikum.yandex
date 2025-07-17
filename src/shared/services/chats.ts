import ChatApi from '@/shared/api/chats.ts';

const chatApi = new ChatApi();

export const getChats = async () => {
  await chatApi.listChats().then((response) => {
    // @ts-ignore
    (window as any).store.set({ chats: JSON.parse(response) });
  });
};

export const createChat = async (data: Record<string, any>) => {
  (window as any).store.set({ isLoading: true });
  try {
    const response = await chatApi.createChat(data);
    console.log(response, 'getChats');
    await getChats();
  } catch (responsError) {
    console.error(responsError);
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};

export const getUsersInChat = async (id: number) => {
  (window as any).store.set({ isLoading: true });
  try {
    const response = await chatApi.userInChat(id);
    console.log(response, 'getUsersInChat');
  } catch (responsError) {
    console.error(responsError);
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};

export const putUsersInChat = async (data: Record<string, any>) => {
  (window as any).store.set({ isLoading: true });
  try {
    const response = await chatApi.addUserInChat(data);
    console.log(response, 'putUsersInChat');
  } catch (responsError) {
    console.error(responsError);
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};

export const deleteUsersInChat = async (data: Record<string, any>) => {
  (window as any).store.set({ isLoading: true });
  try {
    const response = await chatApi.deleteUserInChat(data);
    console.log(response, 'deleteUsersInChat');
  } catch (responsError) {
    console.error(responsError);
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};

export const deleteUser = async () => {
  (window as any).store.set({ isLoading: true });
  try {
    const response = await chatApi.deleteUser();
    console.log(response, 'getChats');
  } catch (responsError) {
    console.error(responsError);
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};

export const getTokenChat = async (id: number) => {
  (window as any).store.set({ isLoading: true });
  try {
    const response = await chatApi.pingTokenChats(id);
    // @ts-ignore
    (window as any).store.set({ token_chat: JSON.parse(response).token });
    // @ts-ignore
    return JSON.parse(response);
  } catch (responsError) {
    console.error(responsError);
    return { token: null };
  } finally {
    (window as any).store.set({ isLoading: false });
  }
};
