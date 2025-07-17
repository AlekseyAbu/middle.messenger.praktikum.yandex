// import Block from '@/shared/core/block.ts';
// import template from './Sidebar.hbs?raw';
// import { Avatar, ChatItem, SearchBlock } from '@/shared';
// import { IChatItem } from '@/shared/type';
//
// interface ISidebar {
//   chats: IChatItem[],
//   onClick?: () => void,
// }
// export default class Login extends Block {
//   constructor(props: ISidebar) {
//     const { chats } = props;
//     super('div', {
//       ...props,
//       activeCatIndex: -1,
//       chatList: chats.map((propsChat: IChatItem, index) => new ChatItem({
//         url: propsChat.url,
//         name: propsChat.name,
//         text: propsChat.text,
//         time: propsChat.time,
//         count: propsChat.count,
//         active: propsChat.active,
//         onClick: () => this.setProps({ activeCatIndex: index }),
//       })),
//       SearchBlock: new SearchBlock({ }),
//
//       Avatar: new Avatar({ src: '', size: 's' }),
//
//     }, { className: 'sidebar' });
//   }
//
//   render(): string {
//     const { activeCatIndex } = this.props;
//     const { chatList } = this.children;
//
//     if (!(chatList instanceof Block)) {
//       chatList.forEach((chat: Block, index: number) => {
//         if (index === activeCatIndex) {
//           chat.setProps({ active: true });
//           return;
//         }
//
//         if (chat.props.active) {
//           chat.setProps({ active: false });
//         }
//       });
//     }
//
//     return template;
//   }
// }

import Block from '@/shared/core/block.ts';
import template from './Sidebar.hbs?raw';
import {
  Avatar, Button, ChatItem, SearchBlock,
} from '@/shared';
import { IChatItem } from '@/shared/type';
import { ROUTER } from '@/shared/constants/constants.ts';
import * as chatServices from '@/shared/services/chats.ts';

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
      ChatList: chats.map((propsChat: IChatItem, index) => new ChatItem({
        ...propsChat,
        onClick: () => this.setProps({ activeCatIndex: index }),
      })),
      SearchBlock: new SearchBlock({ }),

      Avatar: new Avatar({ src: '', size: 's' }),

      ButtonProfile: new Button({
        label: 'Профиль',
        type: 'arrow',
        onClick: () => {
          window.router.go(ROUTER.users);
        },
      }),

    }, { className: 'sidebar' });
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.chats !== newProps.chats) {
      this.children.ChatList = newProps.chats.map((propsChat: IChatItem, index) => new ChatItem({
        ...propsChat,
        onClick: (id) => {
          console.log('choice chat', id);
          chatServices.getUsersInChat(id);
          window.store.set({ chat_id: id, choice_chat: this.props.chats.find((chat: IChatItem) => chat.id === id) });
        },
      }));
    }

    return true;
  }

  render(): string {
    return template;
  }
}
