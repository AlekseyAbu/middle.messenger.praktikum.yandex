import Block from '@/shared/core/block.ts';
import template from './Main.hbs?raw';
import { Feed, Sidebar } from '@/widgets';
import mockChats from './mockChats.ts';
import mockFeed from './mockFeed.ts';
import { connect } from '@/shared/store/connect.ts';
import * as chatServices from '@/shared/services/chats.ts';

class LoginPage extends Block {
  constructor() {
    super('div', {
      activeCatIndex: -1,
      openFeed: {},
      chatList: [...mockChats],
      Sidebar: new Sidebar({
        chats: [],
      }),
      Feed: new Feed({ name: '', feed: [], isActiveFeed: null }),
    }, { className: 'wrapper' });
  }

  public init(): void {
    super.init();
    chatServices.getChats();
  }

  public componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
    if (this.props.chats) {
      this.children.Sidebar.setProps({
        chats: this.props.chats,
      });
    }
    return true;
  }

  render(): string {
    return template;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  chats: state.chats,
});

export default connect(mapStateToProps)(LoginPage);
