import Block from '@/shared/core/block.ts';
import template from './Modal.hbs?raw';
import { Button, InputField } from '@/shared';

interface IModal {
  title: string,
  onClick: (str: string) => void,
}

export default class Modal extends Block {
  constructor(props: IModal) {
    const {
      title, onClick,
    } = props;
    super('div', {
      title,
      str: '',

      InputLogin: new InputField({
        label: 'Логин',
        name: 'login',
        onChange: (event: InputEvent) => {
          const { value } = event.target as HTMLInputElement;
          this.setProps({ str: value });
        },
      }),

      Button: new Button({
        label: 'Добавить',
        type: 'primary',
        onClick: () => {
          onClick(this.props.str);
        },
      }),
    });
  }

  render(): string {
    return template;
  }
}
