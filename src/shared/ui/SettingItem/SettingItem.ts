import Block from '@/shared/core/block.ts';
import template from './SettingItem.hbs?raw';
import { Input } from '@/shared';

interface ISettingItem {
  onChange?: (event: InputEvent) => void,
  value: string,
  name: string,
  disabled?: boolean,
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
        disabled: props.disabled,
      }),
    }, {
      className: 'settings-item',
    });
  }

  componentDidUpdate(oldProps, newProps) {
    console.log(oldProps.value !== newProps.value, newProps.value);
    if (oldProps.value !== newProps.value) {
      console.log(this.children.Input, 'this.children.Input');
      this.children.Input.setProps({ value: newProps.value });
    }

    return true;
  }

  render(): string {
    return template;
  }
}
