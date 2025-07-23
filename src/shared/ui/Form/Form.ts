import Block from '@/shared/core/block.ts';
import template from './Form.hbs?raw';
import { Button, Input } from '@/shared';

interface IForm {
  onSubmit?: (event: string) => void,
  onChange?: (event: Event) => void,
}

export default class Form extends Block {
  constructor(props: IForm) {
    super('form', {
      ...props,
      valueInput: '',
      events: {
        onSumbit: props.onSubmit,
      },
      Input: new Input({
        onChange: (event: InputEvent) => {
          const { value } = event.target as HTMLInputElement;
          this.setProps({ valueInput: value });
        },
        placeholder: 'Сообщение',
        name: 'message',
      }),
      ButtonSend: new Button({
        icon: 'arrow-line.svg',
        view: 'arrow',
        onClick: (event: Event) => {
          event.preventDefault();
          console.log('123');
          if (this.props.valueInput === '') return;
          this.props.onSubmit(this.props.valueInput);
          this.setProps({ valueInput: '' });
          (this.children.Input as Block).setProps({ value: '' });
          console.log('12343234');
        },
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
