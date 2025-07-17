import Block from '@/shared/core/block.ts';
import template from './Feed.hbs?raw';
import {
  Avatar, Button, Form, Message, Modal,
} from '@/shared';
import { MessageType } from '@/shared/type';
import * as chatServices from '../../shared/services/chats.ts';
import { ToolTip } from '@/shared/ui/ToolTip';
import { connect } from '@/shared/store/connect.ts';
import { WebSocketEvents, WebSocketTransport } from '@/shared/api/socket.ts';
import * as authServices from '@/shared/services/auth.ts';

interface IFeed {
  name?: string;
  feed: { [key: number]: MessageType[] };
  isActiveFeed: number | null,
}
class Feed extends Block {
  private socket: WebSocketTransport | null = null;

  constructor(props: IFeed) {
    super('div', {
      ...props,
      formState: {
        login: '',
        password: '',
      },
      inputValue: '',
      openModal: false,
      titleModal: '',
      typeModal: '',
      openToolTip: false,
      choiceChat: false,
      Avatar: new Avatar({
        src: 'https://lastfm.freetls.fastly.net/i/u/ar0/708e7517998748bac8a19f4a42635124.png',
        size: 's',
      }),
      Form: new Form({
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;

          this.setProps({
            inputValue: value,
          });
        },
        onSubmit: (event) => {
          event.preventDefault();
          console.log(event, this.socket, 'event');
          console.log(this.props.inputValue, 'this.props.inputValue');
          // @ts-ignore
          this.socket.send({
            content: this.props.inputValue,
            type: 'message',
          });
        },
      }),

      Button: new Button({
        class: 'feed__header__btn',
        onClick: (event) => {
          event.preventDefault();
          console.log('open tooltip');
          this.setProps({ openToolTip: !this.props.openToolTip });
        },
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
              chatServices.putUsersInChat({
                users: [4395],
                chatId: this.props.chat_id,
              });
              break;
            case 'deleteUser':
              chatServices.deleteUsersInChat({
                users: [4395],
                chatId: this.props.chat_id,
              });
              console.log('hey1');
              break;
            case 'addChats':
              chatServices.createChat({
                title: str,
              });
              break;

            default:
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

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
    if (oldProps.chat_id !== newProps.chat_id) {
      this.setProps({ choiceChat: !!newProps.chat_id });
      this.setProps({ name: this.props.choice_chat.title });

      // Закрываем предыдущее соединение
      if (this.socket) {
        // this.socket.close();
        this.socket = null;
      }

      // Если chat_id доступен - подключаемся к сокету
      if (newProps.chat_id) {
        this.connectToWebSocket(newProps.chat_id);
      }
      return true;
    }

    if (this.props.message) {
      console.log(this.props.message, 'this.props.message');
      this.children.feedList = this.props.message.map((propsFeed: MessageType) => new Message({
        ...propsFeed,
        way: propsFeed.id === this.props.user_id ? 'out' : 'in',
      }));

      console.log(this.children.feedList, 'his.children.feedList');
    }

    return true;
  }

  public init(): void {
    super.init();
    authServices.checkLoginUser();
  }

  private async connectToWebSocket(chatId: number) {
    try {
      // Получаем токен для чата
      const { token } = await chatServices.getTokenChat(chatId);

      // Получаем ID пользователя из стора
      const userId = JSON.parse(this.props.user)?.id;

      if (!userId) {
        throw new Error('User ID not available');
      }

      // Формируем URL для WebSocket
      const webSocketUrl = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;

      // Создаем экземпляр транспорта
      this.socket = new WebSocketTransport(webSocketUrl);

      // Подключаемся и слушаем сообщения
      await this.socket.connect();

      // Подписываемся на получение сообщений
      this.socket.on(WebSocketEvents.Message, (data: any) => {
        console.log('Received message:', data);
        (window as any).store.set({ message: data });
      });

      this.socket.getOldMessages();
      // console.log(this.socket.getOldMessages());

      // Обработка ошибок
      this.socket.on(WebSocketEvents.Error, (event: Event) => {
        console.error('WebSocket error:', event);
      });
    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  }

  render(): string {
    // this.children.Modal.setProps({ title: this.props.titleModal });
    if (this.props.message) {
      this.children.feedList = this.props.message.map((propsFeed: MessageType) => new Message({
        ...propsFeed,
      }));
    }

    return template;
  }
}

const mapStateToProps = (state: Record<string, any>) => ({
  choice_chat: state.choice_chat,
  chat_id: state.chat_id,
  message: state.message,
  user: state.user,
});

export default connect(mapStateToProps)(Feed);
