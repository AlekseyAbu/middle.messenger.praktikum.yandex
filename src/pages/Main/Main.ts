import Block from '@/shared/core/block.ts';
import template from './Main.hbs?raw';
import { Feed, Sidebar } from '@/widgets';
import mockChats from './mockChats.ts';
import mockFeed from './mockFeed.ts';
import { connect } from '@/shared/store/connect.ts';

class LoginPage extends Block {
  constructor() {
    super('div', {
      activeCatIndex: -1,
      openFeed: {},
      chatList: [...mockChats],
      Sidebar: new Sidebar({
        chats: [],
      }),
      Feed: new Feed({ name: 'Вадим', feed: [], isActiveFeed: null }),
    }, { className: 'wrapper' });
  }

  render(): string {
    const {
      Feed, Sidebar,
    } = this.children;

    if (Sidebar instanceof Block) {
      Sidebar.setProps({
        chats: mockChats,
      });
    }

    return template;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  chats: state.chats,
});

export default connect(mapStateToProps)(LoginPage);
