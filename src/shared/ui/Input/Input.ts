import Block from '@/shared/core/block.ts';

interface IInputProps {
  onChange?: (event: InputEvent) => void,
  placeholder?: string,
  class?: string,
  name?: string,
  value?: string,
}
export default class Input extends Block {
  constructor(props: IInputProps) {
    super('input', {
      ...props,
      events: {
        change: props.onChange,
      },
    }, {
      className: `input__element ${props.class}`,
      attr: {
        placeholder: '',
      },
    });
  }
}
