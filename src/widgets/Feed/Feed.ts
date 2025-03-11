import Block from '@/shared/core/block.ts';
import template from './Feed.hbs?raw';
import { Avatar, Form, Message } from '@/shared';
import { MessageType } from '@/shared/type';

interface IFeed {
  name?: string;
  feed: { [key: number]: MessageType[] };
  isActiveFeed: number,
}
export default class Feed extends Block {
  constructor(props: IFeed) {
    super('div', {
      ...props,
      formState: {
        login: '',
        password: '',
      },
      Avatar: new Avatar({
        src: 'https://lastfm.freetls.fastly.net/i/u/ar0/708e7517998748bac8a19f4a42635124.png',
        size: 's',
      }),
      Form: new Form({

      }),

      feedList: props.feed[props.isActiveFeed].map((propsFeed: MessageType) => new Message({
        ...propsFeed,
      })),

    }, { className: 'feed' });
  }

  render(): string {
    return template;
  }
}
