import Block from '@/shared/core/block.ts';
import template from './Main.hbs?raw';
import { Feed, Sidebar } from '@/widgets';
import mockChats from './mockChats.ts';
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

  public componentDidUpdate(): boolean {
    if (this.props.chats) {
      (this.children.Sidebar as Block).setProps({
        chats: this.props.chats,
      });
    }
    return true;
  }

  render(): string {
    return template;
  }
}

const mapStateToProps = (state: Record<string, any>) => ({
  user: state.user,
  chats: state.chats,
});

export default connect(mapStateToProps)(LoginPage);
