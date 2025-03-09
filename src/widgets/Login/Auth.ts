import Block from '@/shared/core/block.ts';
import template from './Login.hbs?raw';
import { Button, InputField } from '@/shared';
import Validator from '@/shared/utils/validate.ts';

interface IInterface {
  title?: string;
}

const validator = new Validator();
export default class Login extends Block {
  constructor(props: IInterface) {
    super('form', {
      ...props,
      formState: {
        login: '',
        password: '',
      },
      events: {
        submit: () => console.log('hey'),
      },
      InputLogin: new InputField({
        label: 'Логин',
        name: 'login',
        onChange: (event) => {
          const { value } = event.target;
          let error = '';

          if (!validator.login(value)) {
            error = 'Введите от 3 до 20 символов';
          }

          if (!value.length) {
            error = '';
          }

          this.children.InputLogin.setProps({
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
        onChange: (event) => {
          const { value } = event.target;
          let error = '';

          if (!validator.password(value)) {
            error = 'Введите от 8 до 40 символов';
          }

          if (!value.length) {
            error = '';
          }

          this.children.InputPassword.setProps({
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
        onClick: () => {
          console.log(this.props.formState);
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
