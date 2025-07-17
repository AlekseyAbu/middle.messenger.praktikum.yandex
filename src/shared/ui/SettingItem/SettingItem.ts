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

  public componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.value !== newProps.value) {
      if (this.children?.Input) {
        (this.children.Input as Block).setProps({ value: newProps.value, disabled: newProps.disabled });
      }

      return true;
    }

    if (oldProps.disabled !== newProps.disabled) {
      (this.children.Input as Block).setProps({ value: newProps.value, disabled: newProps.disabled });

      return true;
    }

    return false;
  }

  render(): string {
    return template;
  }
}
