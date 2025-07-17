import ChatApi from '@/shared/api/chats.ts';

const chatApi = new ChatApi();

export const getChats = async () => {
  await chatApi.listChats().then((response) => {
    window.store.set({ chats: JSON.parse(response) });
  });
};

export const createChat = async (data) => {
  window.store.set({ isLoading: true });
  try {
    const response = await chatApi.createChat(data);
    console.log(response, 'getChats');
    await getChats();
    // window.router.go(ROUTER.chats);
    // window.store.set({ user });
  } catch (responsError) {
    // const error = await responsError.json();
    // window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const getUsersInChat = async (id) => {
  window.store.set({ isLoading: true });
  try {
    const response = await chatApi.userInChat(id);
    // console.log(response, 'getUsersInChat');
    // window.router.go(ROUTER.chats);
    // window.store.set({ user });
  } catch (responsError) {
    // const error = await responsError.json();
    // window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const putUsersInChat = async (data) => {
  window.store.set({ isLoading: true });
  try {
    const response = await chatApi.addUserInChat(data);
    console.log(response, 'putUsersInChat');
    // window.router.go(ROUTER.chats);
    // window.store.set({ user });
  } catch (responsError) {
    // const error = await responsError.json();
    // window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const deleteUsersInChat = async (data) => {
  window.store.set({ isLoading: true });
  try {
    const response = await chatApi.deleteUserInChat(data);
    console.log(response, 'deleteUsersInChat');
    // window.router.go(ROUTER.chats);
    // window.store.set({ user });
  } catch (responsError) {
    // const error = await responsError.json();
    // window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const addUser = async (data) => {
  window.store.set({ isLoading: true });
  try {
    const response = await chatApi.addUser(data);
    console.log(response, 'getChats');
    // window.router.go(ROUTER.chats);
    // window.store.set({ user });
  } catch (responsError) {
    // const error = await responsError.json();
    // window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const deleteUser = async () => {
  window.store.set({ isLoading: true });
  try {
    const response = await chatApi.deleteUser();
    console.log(response, 'getChats');
    // window.router.go(ROUTER.chats);
    // window.store.set({ user });
  } catch (responsError) {
    // const error = await responsError.json();
    // window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const getTokenChat = async (id) => {
  window.store.set({ isLoading: true });
  try {
    const response = await chatApi.pingTokenChats(id);
    // window.router.go(ROUTER.chats);
    // console.log(response, 'getTokenChat');
    window.store.set({ token_chat: JSON.parse(response).token });
    return JSON.parse(response);
  } catch (responsError) {
    // const error = await responsError.json();
    // window.store.set({ loginError: error.reason });
    return { token: null };
  } finally {
    window.store.set({ isLoading: false });
  }
};
