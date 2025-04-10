import ChatApi from '@/shared/api/chats.ts';

const chatApi = new ChatApi();

export const getChats = async () => {
  await chatApi.listChats().then((response) => {
    window.store.set({ chats: JSON.parse(response) });
  });
};

export const createChat = async (data) => {
  window.store.set({ isLoading: true });
  // try {
  //   const response = await chatApi.createChat(data);
  //   console.log(response, 'getChats');
  //   await chatApi.listChats();
  //   // window.router.go(ROUTER.chats);
  //   // window.store.set({ user });
  // } catch (responsError) {
  //   // const error = await responsError.json();
  //   // window.store.set({ loginError: error.reason });
  // } finally {
  //   window.store.set({ isLoading: false });
  // }
};

export const addUser = async (id) => {
  window.store.set({ isLoading: true });
  try {
    const response = await chatApi.addUser(id);
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
