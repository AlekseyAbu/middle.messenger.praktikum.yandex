import Block from '@/shared/core/block.ts';
import template from './Message.hbs?raw';
import { MessageType } from '@/shared/type';

// interface IMessage {
//   way: string,
//   type: 'system' | 'text' | 'image',
//   content?: string,
//   url?: string,
//   time?: string,
// }

export default class Message extends Block {
  constructor(props: MessageType) {
    super('li', {
      ...props,
    }, {
      className: `message message_${props.way} message_${props.type}`,
    });
  }

  render(): string {
    return template;
  }
}
