import Block from '@/shared/core/block.ts';

interface IChatItem {
  url?: string,
  name?: string,
  text?: string,
  time?: string,
  count?: number,
  active?: boolean,
  onClick?: () => void,
}

export default class ChatItem extends Block {
  constructor(props: IChatItem) {
    super('li', {
      ...props,
      events: {
        click: props.onClick,
      },
    }, {
    });
  }

  render(): string {
    return `
      <li class="chat-item {{#if active}}active{{/if}}">
        <img class="chat-item__avatar" src="{{url}}" alt="{{name}}"/>
      
         <div class="about">
              <span class="about__name">{{name}}</span>
              <span class="about__text">{{text}}</span>
            </div>
          
            <div class="info">
              <span class="info__time">{{time}}</span>
              <span class="info__notify">{{count}}</span>
            </div>
      </li>
     
    `;
  }
}
