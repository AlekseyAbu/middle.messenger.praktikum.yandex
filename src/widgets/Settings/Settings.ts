import Block from '@/shared/core/block.ts';
import template from './Settings.hbs?raw';
import { Avatar, Button, SettingItem } from '@/shared';
import Validator from '@/shared/utils/validate.ts';
import * as authServices from '../../shared/services/auth';
import { connect } from '@/shared/store/connect.ts';
import isEqual from '@/shared/utils/isEqual.ts';

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
      isPassword: false,
      formState: {
        login: '',
        email: '',
        first_name: '',
        second_name: '',
        phone: '',
        display_name: '',
      },
      passwordState: {
        oldPassword: '',
        newPassword: '',
      },
      ButtonSave: new Button({
        type: 'primary',
        label: 'Сохранить',
        onClick: (event) => {
          event.preventDefault();
          // this.setProps({ errorForm: validator.validateForm(this.props.formState) });
          if (this.props.isPassword) {
            authServices.changePassword({
              oldPassword: this.props.passwordState.oldPassword,
              newPassword: this.props.passwordState.newPassword,
            });
            this.setProps({ isPassword: false });
          } else {
            authServices.changeUser({
              first_name: this.props.formState.first_name,
              second_name: this.props.formState.second_name,
              display_name: this.props.formState.display_name,
              login: this.props.formState.login,
              email: this.props.formState.email,
              phone: this.props.formState.phone,
            });
          }
          this.setProps({ isChange: false });
          this.setProps({ isDefault: true });
        },
      }),
      ButtonChange: new Button({
        type: 'outline',
        label: 'Изменить данные',
        onClick: (event) => {
          event.preventDefault();
          this.setProps({ isChange: true });
          this.setProps({ isPassword: false });
          this.setProps({ isDefault: false });

          this.children.SettingEmail.setProps({ disabled: false });
          this.children.SettingLogin.setProps({ disabled: false });
          this.children.SettingFirstName.setProps({ disabled: false });
          this.children.SettingSecondName.setProps({ disabled: false });
          this.children.SettingDisplayName.setProps({ disabled: false });
          this.children.SettingPhone.setProps({ disabled: false });
          console.log(this.props.formState);
        },
      }),
      ButtonChangePassword: new Button({
        type: 'outline',
        label: 'Изменить пароль',
        onClick: (event) => {
          event.preventDefault();
          this.setProps({ isChange: true });
          this.setProps({ isPassword: true });
          this.setProps({ isDefault: false });

          this.children.SettingOldPassword.setProps({ value: '' });
          this.children.SettingNewPassword.setProps({ value: '' });
          this.children.SettingNewReplayPassword.setProps({ value: '' });
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
              display_name: value,
            },
          });

          console.log(this.props.formState, 'this.props.formState in display name');
        },
      }),
      SettingPhone: new SettingItem({
        nameSetting: 'Телефон',
        value: '+7 (909) 967 30 30',
        name: 'phone',
        disabled: true,
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
      SettingOldPassword: new SettingItem({
        nameSetting: 'Старый пароль',
        value: 'Иван',
        name: 'password',
        disabled: false,
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.password(value)) {
            error = 'Задайте верный пароль';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.SettingOldPassword as Block).setProps({
            error,
          });

          this.setProps({
            passwordState: {
              ...this.props.passwordState,
              oldPassword: value,
            },
          });
        },
      }),

      SettingNewPassword: new SettingItem({
        nameSetting: 'Новый пароль',
        value: 'Иван',
        name: 'password',
        disabled: false,
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.password(value)) {
            error = 'Задайте верный пароль';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.SettingNewPassword as Block).setProps({
            error,
          });

          this.setProps({
            passwordState: {
              ...this.props.passwordState,
              newPassword: value,
            },
          });
        },
      }),

      SettingNewReplayPassword: new SettingItem({
        nameSetting: 'Повторите новый пароль',
        value: 'Иван',
        name: 'password',
        disabled: false,
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          let error = '';

          if (!validator.password(value)) {
            error = 'Задайте верный пароль';
          }

          if (!value.length) {
            error = '';
          }

          (this.children.SettingNewReplayPassword as Block).setProps({
            error,
          });

          this.setProps({
            passwordState: {
              ...this.props.passwordState,
              newPassword: value,
            },
          });
        },
      }),

    }, { className: 'setting__content' });
  }

  public init(): void {
    super.init();
    authServices.checkLoginUser();
  }

  public componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
    if (this.props.user) {
      // if (!isEqual(oldProps.user, newProps.user ) && newProps.user) {
      const data = JSON.parse(this.props.user);

      if (!isEqual(this.props.formState, data) && !this.props.isChange) {
        console.log('ehy');
        this.setProps({
          formState: {
            ...this.props.formState,
            ...data,
          },
        });
      }

      if (data) {
        const {
          email, login, first_name, second_name, display_name, phone,
        } = data;

        const {
          SettingEmail, SettingLogin, SettingFirstName, SettingSecondName, SettingDisplayName, SettingPhone,
        } = this.children;

        if (SettingEmail instanceof Block) {
          this.children.SettingEmail.setProps({ value: email });
        }
        if (SettingLogin instanceof Block) {
          SettingLogin.setProps({ value: login });
        }
        if (SettingFirstName instanceof Block) {
          SettingFirstName.setProps({ value: first_name });
        }
        if (SettingSecondName instanceof Block) {
          SettingSecondName.setProps({ value: second_name });
        }
        if (SettingDisplayName instanceof Block) {
          SettingDisplayName.setProps({ value: display_name || '' });
        }
        if (SettingPhone instanceof Block) {
          SettingPhone.setProps({ value: phone });
        }
      }
    }

    if (oldProps !== newProps) {
      return true;
    }

    return false;
  }

  render(): string {
    // const {
    //   SettingEmail, SettingLogin, SettingFirstName, SettingSecondName, SettingDisplayName, SettingPhone,
    // } = this.children;

    // const data = JSON.parse(this.props.user);
    //
    // console.log(data, 'data');

    // if (SettingEmail instanceof Block) {
    //   SettingEmail.setProps({ disabled: this.props.isChange });
    //   if (data?.email) {
    //     SettingEmail.setProps({ value: data.email });
    //   }
    // }
    // //
    // if (SettingLogin instanceof Block) {
    //   if (data?.login) {
    //     SettingLogin.setProps({ value: data.login });
    //   }
    // }
    //
    // if (SettingFirstName instanceof Block) {
    //   if (data?.first_name) {
    //     SettingFirstName.setProps({ value: data.first_name });
    //   }
    // }
    //
    // if (SettingSecondName instanceof Block) {
    //   if (data?.second_name) {
    //     SettingSecondName.setProps({ value: data.second_name });
    //   }
    // }
    //
    // if (SettingDisplayName instanceof Block) {
    //   SettingDisplayName.setProps({ value: data?.second_name || '' });
    // }
    //
    // if (SettingPhone instanceof Block) {
    //   if (data?.phone) {
    //     SettingPhone.setProps({ value: data.phone });
    //   }
    // }

    return template;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Settings);
