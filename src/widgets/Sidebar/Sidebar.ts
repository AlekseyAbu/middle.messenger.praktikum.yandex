import Block from '@/shared/core/block.ts';
import template from './Sidebar.hbs?raw';
import { Avatar, ChatItem, SearchBlock } from '@/shared';
import { IChatItem } from '@/shared/type';

interface ISidebar {
  chats: IChatItem[],
  onClick?: () => void,
}
export default class Login extends Block {
  constructor(props: ISidebar) {
    const { chats } = props;
    super('div', {
      ...props,
      activeCatIndex: -1,
      chatList: chats.map((propsChat: IChatItem, index) => new ChatItem({
        url: propsChat.url,
        name: propsChat.name,
        text: propsChat.text,
        time: propsChat.time,
        count: propsChat.count,
        active: propsChat.active,
        onClick: () => this.setProps({ activeCatIndex: index }),
      })),
      SearchBlock: new SearchBlock({ }),

      Avatar: new Avatar({ src: '', size: 's' }),

    }, { className: 'sidebar' });
  }

  render(): string {
    const { activeCatIndex } = this.props;
    const { chatList } = this.children;

    chatList.forEach((chat, index) => {
      if (index === activeCatIndex) {
        chat.setProps({ active: true });
        return;
      }

      if (chat.props.active) {
        chat.setProps({ active: false });
      }
    });

    return template;
  }
}
