import Block from '@/shared/core/block.ts';
import template from './Modal.hbs?raw';
import { AvatarInput, Button, InputField } from '@/shared';

interface IModal {
  title: string,
  isUpdateAvatar?: boolean,
  onClick: (str: string) => void,
  onChange?: (event: InputEvent) => void,
}

export default class Modal extends Block {
  constructor(props: IModal) {
    const {
      title, isUpdateAvatar, onClick,
    } = props;
    super('div', {
      title,
      str: '',
      isUpdateAvatar,

      InputLogin: new InputField({
        label: 'Логин',
        name: 'login',
        onChange: (event: InputEvent) => {
          const { value } = event.target as HTMLInputElement;
          this.setProps({ str: value });
        },
      }),

      AvatarInput: new AvatarInput({
        onChange: props.onChange,
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
