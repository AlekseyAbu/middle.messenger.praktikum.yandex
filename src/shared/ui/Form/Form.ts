import Block from '@/shared/core/block.ts';
import template from './Form.hbs?raw';
import { Button, Input } from '@/shared';

interface IForm {
  onSubmit?: (event: Event) => void,
  onChange?: (event: Event) => void,
}

export default class Form extends Block {
  constructor(props: IForm) {
    super('form', {
      ...props,
      events: {
        onSumbit: props.onSubmit,
      },
      Input: new Input({
        onChange: props.onChange,
        placeholder: 'Сообщение',
        name: 'message',
      }),
      ButtonSend: new Button({
        icon: 'arrow-line.svg',
        view: 'arrow',
        onClick: props.onSubmit,
      }),
      ButtonMenu: new Button({
        icon: 'clip.svg',
        view: 'file',
      }),
    }, {
      className: 'form-input',
    });
  }

  render(): string {
    return template;
  }
}
