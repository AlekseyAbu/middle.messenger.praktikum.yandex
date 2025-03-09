import Block from '@/shared/core/block.ts';
import template from './SettingItem.hbs?raw';
import { Input } from '@/shared';

interface ISettingItem {
  onChange?: (event: InputEvent) => void,
  value: string,
  name: string,
  nameSetting: string,
}

export default class SettingItem extends Block {
  constructor(props: ISettingItem) {
    const { onChange } = props;
    super('div', {
      ...props,
      Input: new Input({
        onChange,
        class: 'settings-item__input',
        name: props.name,
        value: props.value,
      }),
    }, {
      className: 'settings-item',
    });
  }

  render(): string {
    return template;
  }
}
