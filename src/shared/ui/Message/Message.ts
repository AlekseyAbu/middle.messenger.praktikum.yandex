import Block from '@/shared/core/block.ts';
// import template from './Message.hbs?raw';
import { MessageType } from '@/shared/type';
import isEqual from '@/shared/utils/isEqual.ts';

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

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    console.log(oldProps, 'oldProps', newProps, 'newProps');
    if (!isEqual(oldProps, newProps)) {
      console.log('isEqual in message');
      this.props.setProps({ ...newProps });
      return true;
    }

    return true;
  }

  render(): string {
    // return template;
    console.log(this.props, 'props');
    console.log('render');
    return `
    <div class="message__content message__content__{{type}} message__content_{{way}}">
       {{content}}
      <span class="message__content__time message__content__time_{{way}}">{{time}}</span>
    </div>`;
  }
}
