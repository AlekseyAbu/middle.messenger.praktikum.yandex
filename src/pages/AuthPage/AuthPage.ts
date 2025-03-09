import Block from '@/shared/core/block.ts';
import template from './AuthPage.hbs?raw';
import { Auth } from '@/widgets';

export default class LoginPage extends Block {
  constructor() {
    super('div', {
      Auth: new Auth({ title: 'Вход' }),
    }, { className: 'fon' });
  }

  render(): string {
    return template;
  }
}
