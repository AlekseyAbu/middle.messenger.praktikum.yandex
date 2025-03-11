import Block from '@/shared/core/block.ts';
import { Input } from '@/shared';
import template from './InputField.hbs?raw';

interface IInputFieldProps {
  label: string,
  name?: string,
  placeholder?: string,
  class?: string,
  value?: string,
  onChange?: (event: InputEvent) => void
}
export default class InputField extends Block {
  constructor(props: IInputFieldProps) {
    super('div', {
      ...props,
      Input: new Input({
        placeholder: props.placeholder,
        class: props.class,
        name: props.name,
        value: props.value,
        onChange: props.onChange,
      }),
    }, { className: 'wrapper-input' });
  }

  public render(): string {
    return template;
  }
}
