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
  Avatar, Button, ChatItem, Message, SearchBlock,
} from '@/shared';
import { IChatItem, MessageType } from '@/shared/type';
import { ROUTER } from '@/shared/constants/constants.ts';

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

  componentDidUpdate(oldProps, newProps) {
    this.children.ChatList = newProps.chats.map((propsChat: IChatItem, index) => new ChatItem({
      ...propsChat,
      onClick: (id) => {
        window.store.set({ chat_id: id });
      },
    }));

    return true;

    console.log(this.children, 'this.children componentDidUpdate');
  }

  render(): string {
    const { activeCatIndex } = this.props;
    const { ChatList } = this.children;
    //
    if (this.props.chats) {
      console.log(this.children, 'this.children');
      console.log(ChatList, 'ChatList');
      this.props.chats.map((propsChat: IChatItem, index) => new ChatItem({
        ...propsChat,
        onClick: (id) => {
          window.store.set({ chat_id: id });
        },
      }));

      console.log('this.props.chats', this.props.chats);
    }

    // if (!(chatList instanceof Block)) {
    //   chatList.forEach((chat: Block, index: number) => {
    //     if (index === activeCatIndex) {
    //       chat.setProps({ active: true });
    //       return;
    //     }
    //
    //     if (chat.props.active) {
    //       chat.setProps({ active: false });
    //     }
    //   });
    // }

    return template;
  }
}
