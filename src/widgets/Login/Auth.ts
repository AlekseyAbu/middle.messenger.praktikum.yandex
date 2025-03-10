import Block from '@/shared/core/block.ts';
import template from './Auth.hbs?raw';
import { Button, InputField } from '@/shared';
import Validator from '@/shared/utils/validate.ts';

interface IInterface {
  title?: string;
}

const validator = new Validator();
export default class Auth extends Block {
  constructor(props: IInterface) {
    super('form', {
      ...props,
      errorForm: false,
      formState: {
        login: '',
        password: '',
      },
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          console.log(this.props.formState, 'submit');
        },
      },
      InputLogin: new InputField({
        label: 'Логин',
        name: 'login',
        onChange: (event: InputEvent) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.login(value)) {
            error = 'Введите от 3 до 20 символов';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.InputLogin as Block).setProps({
            error,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              login: value,
            },
          });
        },
      }),
      InputPassword: new InputField({
        label: 'Пароль',
        name: 'password',
        onChange: (event: InputEvent) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.password(value)) {
            error = 'Введите от 8 до 40 символов';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.InputPassword as Block).setProps({
            error,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              password: value,
            },
          });
        },
      }),

      ButtonSighIn: new Button({
        label: 'Авторизоваться',
        type: 'primary',
        class: 'button_auth',
        typeBtn: 'submit',
        onClick: () => {
          console.log(this.props.formState);
          this.setProps({ errorForm: validator.validateForm(this.props.formState) });
        },
      }),
      ButtonNotAccount: new Button({ label: 'Нет аккаунта?', type: 'outline' }),
    }, {
      className: 'form',
    });
  }

  render(): string {
    return template;
  }
}
