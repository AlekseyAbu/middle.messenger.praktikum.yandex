import Block from '@/shared/core/block.ts';
import template from './Main.hbs?raw';
import { Feed, Sidebar } from '@/widgets';
import mockChats from './mockChats.ts';
import mockFeed from './mockFeed.ts';

export default class LoginPage extends Block {
  constructor() {
    super('div', {
      activeCatIndex: -1,
      openFeed: {},
      chatList: [...mockChats],
      Sidebar: new Sidebar({
        chats: mockChats,
      }),
      Feed: new Feed({ name: 'Вадим', feed: mockFeed, isActiveFeed: 1 }),
    }, { className: 'wrapper' });
  }

  render(): string {
    return template;
  }
}
