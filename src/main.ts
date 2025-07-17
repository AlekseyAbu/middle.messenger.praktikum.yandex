import './shared/style/index.scss';
import './shared/style/reset.scss';
import Router from '@/shared/core/Router.ts';
import { ROUTER } from '@/shared/constants/constants.ts';
import * as Pages from '@/pages';
import { Store, StoreEvents } from '@/shared/store/store.ts';

window.store = new Store({
  isLoading: false,
  user: null,
  loginError: null,
  chats: null,
  chat_id: null,
  choice_chat: null,
});

store.on(StoreEvents.Updated, (prevState, newState) => {
  // console.log('prevState', prevState);
  // console.log('newState', newState);
});

const APP_ROOT_ELEMENT = '#app';
window.router = new Router(APP_ROOT_ELEMENT);
window.router
  .use(ROUTER.login, Pages.LoginPage)
  .use(ROUTER.auth, Pages.AuthPage)
  .use(ROUTER.chats, Pages.Main)
  .use(ROUTER.users, Pages.SettingPage)
  .use('*', Pages.NotFoundPage)
  .start();
