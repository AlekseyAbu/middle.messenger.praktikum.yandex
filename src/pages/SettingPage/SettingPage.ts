import Block from '@/shared/core/block.ts';
import template from './SettingPage.hbs?raw';
import { Settings } from '@/widgets';

export default class ServerErrorPage extends Block {
  constructor() {
    super('div', {
      Setting: new Settings({ name: 'Иван' }),
    });
  }

  render(): string {
    return template;
  }
}
