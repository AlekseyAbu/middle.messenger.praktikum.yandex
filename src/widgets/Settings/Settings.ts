import Block from '@/shared/core/block.ts';
import template from './Settings.hbs?raw';
import {
  Avatar, Button, Modal, SettingItem,
} from '@/shared';
import Validator from '@/shared/utils/validate.ts';
import * as authServices from '../../shared/services/auth';
import { connect } from '@/shared/store/connect.ts';
import isEqual from '@/shared/utils/isEqual.ts';
import Name from '@/widgets/Settings/Name.ts';

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
      openModal: false,
      avatarFile: null,
      ButtonSave: new Button({
        type: 'primary',
        label: 'Сохранить',
        onClick: (event) => {
          event.preventDefault();
          console.log();
          if (this.props.error) return;
          // this.setProps({ errorForm: validator.validateForm(this.props.formState) });
          if (this.props.isPassword) {
            authServices.changePassword({
              oldPassword: this.props.passwordState.oldPassword,
              newPassword: this.props.passwordState.newPassword,
            });
            this.setProps({ isPassword: false });
          } else {
            if (validator.validateForm(this.props.formState)) return;
            this.setProps({ errorForm: validator.validateForm(this.props.formState) });
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

          (this.children.SettingEmail as Block).setProps({ disabled: false });
          (this.children.SettingLogin as Block).setProps({ disabled: false });
          (this.children.SettingFirstName as Block).setProps({ disabled: false });
          (this.children.SettingSecondName as Block).setProps({ disabled: false });
          (this.children.SettingDisplayName as Block).setProps({ disabled: false });
          (this.children.SettingPhone as Block).setProps({ disabled: false });
          console.log(this.props.formState);
        },
      }),
      Name: new Name({
        name: '',
      }),
      ButtonChangePassword: new Button({
        type: 'outline',
        label: 'Изменить пароль',
        onClick: (event) => {
          event.preventDefault();
          this.setProps({ isChange: true });
          this.setProps({ isPassword: true });
          this.setProps({ isDefault: false });

          (this.children.SettingOldPassword as Block).setProps({ value: '' });
          (this.children.SettingNewPassword as Block).setProps({ value: '' });
          (this.children.SettingNewReplayPassword as Block).setProps({ value: '' });
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
      Modal: new Modal({
        title: 'Изменить аватар',
        isUpdateAvatar: true,
        onChange: (event) => {
          console.log(event, 'event');
          const input = event.target as HTMLInputElement;
          const file = input.files?.[0];

          if (!file) return;

          const formData = new FormData();
          formData.append('avatar', file);

          this.setProps({ avatarFile: formData });
        },
        onClick: (str) => {
          if (this.props.avatarFile) {
            authServices.updateAvatar(this.props.avatarFile);
          }
          console.log(str);
          this.setProps({
            openModal: false,
          });
        },
      }),
      Avatar: new Avatar({
        src: '',
        size: 'l',
        customClass: 'profile-avatar',
        onClick: () => {
          this.setProps({
            openModal: true,
          });
        },
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

          console.log(error, !value.length, 'error');
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
    console.log('componentDidUpdate');
    if (this.props.user) {
      // if (!isEqual(oldProps.user, newProps.user ) && newProps.user) {
      const data = JSON.parse(this.props.user);

      if (!isEqual(this.props.formState, data) && !this.props.isChange) {
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

        // console.log(oldProps.name, 'oldProps.name');
        // if (oldProps.name !== first_name) {
        //   this.setProps({ name: first_name });
        // }

        const {
          SettingEmail, SettingLogin, Name, SettingFirstName, SettingSecondName, SettingDisplayName, SettingPhone, Avatar,
        } = this.children;

        if (SettingEmail instanceof Block) {
          (this.children.SettingEmail as Block).setProps({ value: email });
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
        if (Avatar instanceof Block) {
          Avatar.setProps({ src: data.avatar });
        }
        if (Name instanceof Block) {
          Name.setProps({ name: first_name });
        }
      }
    }

    if (oldProps !== newProps) {
      return true;
    }

    return false;
  }

  render(): string {
    if (this.props.user) {
      // if (!isEqual(oldProps.user, newProps.user ) && newProps.user) {
      const data = JSON.parse(this.props.user);

      if (!isEqual(this.props.formState, data) && !this.props.isChange) {
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
          SettingEmail, SettingLogin, Name, SettingFirstName, SettingSecondName, SettingDisplayName, SettingPhone, Avatar,
        } = this.children;

        // console.log(this.props.name, '12312312321');
        // if (this.props.name !== first_name) {
        //   this.setProps({ name: first_name });
        // }

        if (SettingEmail instanceof Block) {
          (this.children.SettingEmail as Block).setProps({ value: email });
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
        if (Avatar instanceof Block) {
          Avatar.setProps({ src: data.avatar });
        }
        if (Name instanceof Block) {
          Name.setProps({ name: first_name });
        }
      }
    }

    return template;
  }
}

const mapStateToProps = (state: Record<string, any>) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Settings);
