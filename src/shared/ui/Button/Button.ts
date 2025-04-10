import './Button.scss';
import Block from '@/shared/core/block.ts';
import template from './Button.hbs?raw';

interface IButton {
  type?: string,
  class?: string,
  view?: string,
  label?: string,
  icon?: string,
  typeBtn?: string,
  onClick?: (event) => void,
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
      attr: {
        type: props.typeBtn ? props.typeBtn : '',
      },
    });
  }

  render(): string {
    return template;
  }
}
