import Block from '@/shared/core/block.ts';
import template from './SettingPage.hbs?raw';
import { Settings } from '@/widgets';
import { Button } from '@/shared';
import { ROUTER } from '@/shared/constants/constants.ts';

export default class ServerErrorPage extends Block {
  constructor() {
    super('div', {
      Setting: new Settings({ name: 'Иван' }),
      ButtonBack: new Button({
        type: 'outline',
        label: 'Назад к чатам',
        onClick: () => { (window as any).router.go(ROUTER.chats); },
      }),
    }, { className: 'setting' });
  }

  render(): string {
    return template;
  }
}
