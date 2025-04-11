import Block from '@/shared/core/block.ts';
import template from './Settings.hbs?raw';
import { Avatar, Button, SettingItem } from '@/shared';
import Validator from '@/shared/utils/validate.ts';
import * as authServices from '../../shared/services/auth';
import { connect } from '@/shared/store/connect.ts';

interface ISettings {
  name: string
}

const validator = new Validator();
class Settings extends Block {
  constructor(props: ISettings) {
    super('form', {
      ...props,
      errorForm: false,
      isDefault: true,
      isChange: false,
      formState: {
        login: '',
        email: '',
        first_name: '',
        second_name: '',
        phone: '',
        display_name: '',
      },
      ButtonSave: new Button({
        type: 'primary',
        label: 'Сохранить',
        onClick: () => {
          this.setProps({ errorForm: validator.validateForm(this.props.formState) });
        },
      }),
      ButtonChange: new Button({
        type: 'outline',
        label: 'Изменить данные',
        onClick: (event) => {
          event.preventDefault();
          this.setProps({ isChange: true });
          authServices.changeUser(this.props.formState);
          console.log(this.props.formState);
        },
      }),
      ButtonChangePassword: new Button({
        type: 'outline',
        label: 'Изменить пароль',
        onClick: () => {
          console.log(this.props.formState);
        },
      }),
      ButtonExit: new Button({
        type: 'outline',
        class: 'red',
        label: 'Выйти',
        onClick: (event) => {
          event.preventDefault();
          console.log('hey');
          authServices.exit();
        },
      }),
      ButtonBack: new Button({
        icon: 'arrow-line.svg',
        view: 'arrow',
      }),
      Avatar: new Avatar({
        src: 'https://lastfm.freetls.fastly.net/i/u/ar0/708e7517998748bac8a19f4a42635124.png',
        size: 'l',
      }),
      SettingEmail: new SettingItem({
        nameSetting: 'Почта',
        value: 'user.email',
        name: 'email',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.email(value)) {
            error = 'Введите коректный email';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.SettingEmail as Block).setProps({
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
      SettingLogin: new SettingItem({
        nameSetting: 'Логин',
        value: 'ivanivanov',
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

          (this.children.SettingLogin as Block).setProps({
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
      SettingFirstName: new SettingItem({
        nameSetting: 'Имя',
        value: 'Иван',
        name: 'first_name',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.first_name(value)) {
            error = 'Первая буква должна быть заглавной';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.SettingFirstName as Block).setProps({
            error,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              first_name: value,
            },
          });
        },
      }),
      SettingSecondName: new SettingItem({
        nameSetting: 'Фамилия',
        value: 'Иванов',
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

          (this.children.SettingSecondName as Block).setProps({
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
      SettingDisplayName: new SettingItem({
        nameSetting: 'Имя в чате',
        value: 'Иван',
        name: 'display_name',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.second_name(value)) {
            error = 'Первая буква должна быть заглавной';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.SettingDisplayName as Block).setProps({
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
      SettingPhone: new SettingItem({
        nameSetting: 'Телефон',
        value: '+7 (909) 967 30 30',
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

          (this.children.SettingPhone as Block).setProps({
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

    }, { className: 'setting__content' });
  }

  test() {
    const { SettingSecondName } = this.children;
    console.log('test', SettingSecondName);
    if (SettingSecondName instanceof Block) {
      SettingSecondName.setProps({ value: 'trimtrim' });
    }
  }

  render(): string {
    const {
      SettingEmail, SettingLogin, SettingFirstName, SettingSecondName, SettingDisplayName, SettingPhone,
    } = this.children;

    authServices.checkLoginUser();

    if (SettingEmail instanceof Block) {
      SettingEmail.setProps({ disabled: this.props.isChange });
    }
    //
    if (SettingLogin instanceof Block) {
      if (JSON.parse(this.props.user)?.second_name) {
        SettingLogin.setProps({ value: JSON.parse(this.props.user).second_name });
      }
    }
    //
    // if (SettingFirstName instanceof Block) {
    //   SettingFirstName.setProps({ value: this.user.second_name });
    // }
    //
    // if (SettingSecondName instanceof Block) {
    //   SettingSecondName.setProps({ value: this.user.second_name });
    // }
    //
    // if (SettingDisplayName instanceof Block) {
    //   SettingDisplayName.setProps({ value: this.user.second_name });
    // }
    //
    // if (SettingPhone instanceof Block) {
    //   SettingPhone.setProps({ value: this.user.second_name });
    // }

    return template;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Settings);
