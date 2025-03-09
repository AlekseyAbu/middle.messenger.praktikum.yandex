import './Button.scss';
import Block from '@/shared/core/block.ts';
import template from './Button.hbs?raw';

interface IButton {
  type?: string,
  class?: string,
  view?: string,
  label?: string,
  icon?: string,
  onClick?: () => void,
}

export default class Button extends Block {
  constructor(props: IButton) {
    super('button', {
      ...props,
      events: {
        click: props.onClick,
      },
    }, {
      className: `button button_${props.type} ${props.class} ${props.view}`,
    });
  }

  render(): string {
    return template;
  }
}
