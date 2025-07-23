import Block from '@/shared/core/block.ts';
import template from './Auth.hbs?raw';
import { Button, InputField } from '@/shared';
import Validator from '@/shared/utils/validate.ts';
import * as authServices from '../../shared/services/auth';
import { connect } from '@/shared/store/connect.ts';
import { ROUTER } from '@/shared/constants/constants.ts';

interface IInterface {
  title?: string;
}

const validator = new Validator();
class Auth extends Block {
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
          // console.log(this.props.formState, 'submit');
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
          // console.log(this.props.formState);
          this.setProps({ errorForm: validator.validateForm(this.props.formState) });
          authServices.login(this.props.formState);
          authServices.checkLoginUser();
        },
      }),
      ButtonNotAccount: new Button({
        label: 'Нет аккаунта?',
        type: 'outline',
        onClick: (event) => {
          event.preventDefault();
          (window as any).router.go(ROUTER.login);
        },
      }),
    }, {
      className: 'form',
    });
  }

  isAuth() {
    console.log('isAuth');
    // authServices.checkLoginUser();
  }

  render(): string {
    this.isAuth();
    return template;
  }
}

const mapStateToProps = (state: Record<string, any>) => ({
  isLoading: state.isLoading,
  loginError: state.loginError,
});

export default connect(mapStateToProps)(Auth);
