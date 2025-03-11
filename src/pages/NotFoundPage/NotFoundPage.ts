import Block from '@/shared/core/block.ts';
import template from './NotFoundPage.hbs?raw';
import { Error } from '@/widgets';

export default class NotFoundPage extends Block {
  constructor() {
    super('div', {
      Error: new Error({ status: '404', text: 'Не туда попали' }),
    }, { className: 'wrapper' });
  }

  render(): string {
    return template;
  }
}
