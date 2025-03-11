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
        email: '',
        first_name: '',
        second_name: '',
        phone: '',
        passwordTwo: '',
      },
      errorForm: false,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          console.log(this.props.formState);
        },
      },
      InputEmail: new InputField({
        label: 'Почта',
        name: 'email',
        onChange: (event: InputEvent) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.email(value)) {
            error = 'Введите коректный email';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.InputEmail as Block).setProps({
            error,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              email: value,
            },
          });
        },
      }),
      InputLogin: new InputField({
        label: 'Логин',
        name: 'login',
        onChange: (event) => {
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
      InputFirstName: new InputField({
        label: 'Имя',
        name: 'first_name',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.first_name(value)) {
            error = 'Первая буква должна быть заглавной';
          }

          (this.children.InputFirstName as Block).setProps({
            error,
          });

          if (!value.length) {
            error = '';
          }

          this.setProps({
            formState: {
              ...this.props.formState,
              first_name: value,
            },
          });
        },
      }),
      InputSecondName: new InputField({
        label: 'Фамилия',
        name: 'second_name',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.second_name(value)) {
            error = 'Первая буква должна быть заглавной';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.InputSecondName as Block).setProps({
            error,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              second_name: value,
            },
          });
        },
      }),
      InputPhone: new InputField({
        label: 'Телефон',
        name: 'phone',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.phone(value)) {
            error = 'Введите от 10 до 15 цифр';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.InputPhone as Block).setProps({
            error,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              phone: value,
            },
          });
        },
      }),
      InputPassword: new InputField({
        label: 'Пароль',
        name: 'password',
        onChange: (event) => {
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
      InputPasswordTwo: new InputField({
        label: 'Пароль (ещё раз)',
        name: 'password',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.password(value)) {
            error = 'Введите от 8 до 40 символов';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.InputPasswordTwo as Block).setProps({
            error,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              passwordTwo: value,
            },
          });
        },
      }),

      ButtonSighIn: new Button({
        label: 'Зарегистрироваться',
        type: 'primary',
        class: 'button_auth',
        onClick: () => {
          console.log(this.props.formState);
          this.setProps({ errorForm: validator.validateForm(this.props.formState) });
        },
      }),
      ButtonNotAccount: new Button({ label: 'Зарегистрироваться', type: 'outline' }),
    }, { className: 'form' });
  }

  render(): string {
    return template;
  }
}
