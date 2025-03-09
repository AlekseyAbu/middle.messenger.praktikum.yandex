import Block from '@/shared/core/block.ts';
import { Input } from '@/shared';
import template from './InputField.hbs?raw';

interface IInputFieldProps {
  label: string,
  name?: string,
  onChange?: (event: InputEvent) => void
}
export default class InputField extends Block {
  constructor(props: IInputFieldProps) {
    const { label, name, onChange } = props;
    super('div', {
      label,
      name,
      Input: new Input({
        onChange,
      }),
    }, { className: 'wrapper-input' });
  }

  public render(): string {
    return template;
  }
}
