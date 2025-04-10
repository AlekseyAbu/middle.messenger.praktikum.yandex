// import Block from '@/shared/core/block.ts';
//
// interface IChatItem {
//   url?: string,
//   name?: string,
//   text?: string,
//   time?: string,
//   count?: number,
//   active?: boolean,
//   onClick?: () => void,
// }
//
// export default class ChatItem extends Block {
//   constructor(props: IChatItem) {
//     super('li', {
//       ...props,
//       events: {
//         click: props.onClick,
//       },
//     }, {
//     });
//   }
//
//   render(): string {
//     return `
//       <li class="chat-item {{#if active}}active{{/if}}">
//         <img class="chat-item__avatar" src="{{url}}" alt="{{name}}"/>
//
//          <div class="about">
//               <span class="about__name">{{name}}</span>
//               <span class="about__text">{{text}}</span>
//             </div>
//
//             <div class="info">
//               <span class="info__time">{{time}}</span>
//               <span class="info__notify">{{count}}</span>
//             </div>
//       </li>
//
//     `;
//   }
// }

import Block from '@/shared/core/block.ts';
import { IChatItem } from '@/shared/type';
import isEqual from '@/shared/utils/isEqual.ts';

interface IChatItemProps extends IChatItem {
  onClick?: (id) => void,
}

export default class ChatItem extends Block {
  constructor(props: IChatItemProps) {
    super('li', {
      ...props,
      title: props.title,
      events: {
        click: () => props.onClick(props.id),
      },
    }, {
    });
  }

  componentDidUpdate(oldProps, newProps) {
    console.log(isEqual(oldProps, newProps), newProps, 'isEqual');
    if (isEqual(oldProps, newProps)) {
      this.props.setProps({ ...newProps });
    }

    return true;
  }

  render(): string {
    const {
      avatar, created_by, id, last_message, title, unread_count, active,
    } = this.props;

    console.log(this.props, avatar, created_by, id, last_message, title, unread_count, active, 'props chat item');

    return `
      <li class="chat-item {{#if active}}active{{/if}}">
          <img class="chat-item__avatar" src="{{avatar}}" alt="{{title}}"/>

          <div class="about">
            <span class="about__name">{{title}}</span>
          {{#if last_message}}
            <span class="about__text">{{last_message.text}}</span>
          {{/if}}
          </div>
          {{#if last_message}}
            <div class="info">
              <span class="info__time">{{last_message.time}}</span>
              <span class="info__notify">{{unread_count}}</span>
            </div>
          {{/if}}
      </li>

    `;
  }
}
