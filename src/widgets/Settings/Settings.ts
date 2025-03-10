import Block from '@/shared/core/block.ts';
import template from './Settings.hbs?raw';
import { Avatar, Button, SettingItem } from '@/shared';
import Validator from '@/shared/utils/validate.ts';

interface ISettings {
  name: string
}

const validator = new Validator();
export default class Settings extends Block {
  constructor(props: ISettings) {
    super('form', {
      ...props,
      errorForm: false,
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
          console.log(this.props.formState);
          console.log('hey', validator.validateForm(this.props.formState));
          this.setProps({ errorForm: validator.validateForm(this.props.formState) });
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
        value: 'pochta@yandex.ru',
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

  render(): string {
    return template;
  }
}
