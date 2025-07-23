import Block from '@/shared/core/block.ts';
// import template from './Message.hbs?raw';
import { MessageType } from '@/shared/type';
// import isEqual from '@/shared/utils/isEqual.ts';

// interface IMessage {
//   way: string,
//   type: 'system' | 'text' | 'image',
//   content?: string,
//   url?: string,
//   time?: string,
// }

export default class Message extends Block {
  constructor(props: MessageType) {
    super('div', {
      ...props,
    }, {
      className: `message message_${props.way} message_${props.type}`,
    });
  }

  render(): string {
    return `
    <div class="message__content message__content__{{type}} message__content_{{way}}">
       {{content}}
      <span class="message__content__time message__content__time_{{way}}">{{time}}</span>
    </div>`;
  }
}
