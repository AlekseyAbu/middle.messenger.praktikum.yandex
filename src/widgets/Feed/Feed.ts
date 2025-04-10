import Block from '@/shared/core/block.ts';
import template from './Feed.hbs?raw';
import {
  Avatar, Button, Form, Message, Modal,
} from '@/shared';
import { MessageType } from '@/shared/type';
import * as chatServices from '../../shared/services/chats.ts';
import { ToolTip } from '@/shared/ui/ToolTip';
import { createChat } from '../../shared/services/chats.ts';

interface IFeed {
  name?: string;
  feed: { [key: number]: MessageType[] };
  isActiveFeed: number | null,
}
export default class Feed extends Block {
  constructor(props: IFeed) {
    super('div', {
      ...props,
      formState: {
        login: '',
        password: '',
      },
      openModal: false,
      titleModal: '',
      typeModal: '',
      openToolTip: false,
      Avatar: new Avatar({
        src: 'https://lastfm.freetls.fastly.net/i/u/ar0/708e7517998748bac8a19f4a42635124.png',
        size: 's',
      }),
      Form: new Form({

      }),

      Button: new Button({
        class: 'feed__header__btn',
        onClick: () => { this.setProps({ openToolTip: !this.props.openToolTip }); },
      }),

      feedList: '',

      Modal: new Modal({
        title: '',
        onClick: (str) => {
          console.log(str, 'str');
          this.setProps({
            openModal: false,
          });

          switch (this.props.typeModal) {
            case 'addUser':
              console.log('hey');
              break;
            case 'deleteUser':
              console.log('hey1');
              break;
            case 'addChats':
              chatServices.createChat({
                title: str,
              });
              break;
          }
        },
      }),

      ToolTip: new ToolTip({
        onClick: (type) => {
          this.setProps({
            openModal: true,
            openToolTip: false,
          });
          // eslint-disable-next-line default-case
          switch (type) {
            case 'addUser':
              this.setProps({
                titleModal: 'Добавить пользователя',
                typeModal: type,
              });
              break;
            case 'deleteUser':
              this.setProps({
                titleModal: 'Удалить пользователя',
                typeModal: type,
              });
              break;
            case 'addChats':
              this.setProps({
                titleModal: 'Добавить чат',
                typeModal: type,
              });
              break;
          }
          console.log(type);
        },
      }),

    }, { className: 'feed' });
  }

  render(): string {
    chatServices.getChats();

    this.children.Modal.setProps({ title: this.props.titleModal });

    return template;
  }
}
