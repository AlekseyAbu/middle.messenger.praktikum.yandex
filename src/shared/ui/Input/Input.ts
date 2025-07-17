import Block from '@/shared/core/block.ts';

interface IInputProps {
  onChange?: (event: InputEvent) => void,
  placeholder?: string,
  class?: string,
  name?: string,
  value?: string,
  disabled?: boolean,
}
export default class Input extends Block {
  constructor(props: IInputProps) {
    super('input', {
      ...props,
      events: {
        change: props.onChange,
      },
    }, {
      className: `input__element${props.class ? ` ${props.class}` : ''}`,
      attr: {
        placeholder: props.placeholder ? props.placeholder : '',
        name: props.name ? props.name : '',
        value: props.value ? props.value : '',
        // @ts-expect-error не нашел способ ее исправить
        disabled: props.disabled ? props.disabled : false,
      },
    });
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.value !== newProps.value) {
      this.setProps({ value: newProps.value });
    }

    if (oldProps.disabled !== newProps.disabled) {
      this.setOptionsAttr('disabled', newProps.disabled ?? false);
    }

    return true;
  }

  private setOptionsAttr(key: string, value: any): void {
    // @ts-expect-error не нашел способ ее исправить
    this._options.attr = {
      // @ts-expect-error не нашел способ ее исправить
      ...this._options.attr,
      [key]: value,
    };
  }

  render(): string {
    return '';
  }
}
