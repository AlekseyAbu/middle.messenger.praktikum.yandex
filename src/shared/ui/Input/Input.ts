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
      },
    });
  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps.value !== newProps.value) {
      this.setProps({ value: newProps.value });
    }

    return true;
  }

  render(): string {
    return '';
  }
}
