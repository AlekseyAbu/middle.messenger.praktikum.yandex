import Block from '@/shared/core/block.ts';
import template from './ServerErrorPage.hbs?raw';
import { Error } from '@/widgets';

export default class ServerErrorPage extends Block {
  constructor() {
    super('div', {
      Error: new Error({ status: '500', text: 'Мы уже фиксим' }),
    }, { className: 'wrapper' });
  }

  render(): string {
    return template;
  }
}
