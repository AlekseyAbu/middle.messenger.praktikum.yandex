import Block from '@/shared/core/block.ts';
import template from './LoginPage.hbs?raw';
import { Login } from '@/widgets';

export default class LoginPage extends Block {
  constructor() {
    super('div', {
      Login: new Login({ title: 'Регистрация' }),
    }, { className: 'fon' });
  }

  render(): string {
    return template;
  }
}
