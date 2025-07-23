import Block from '@/shared/core/block.ts';
import template from './Error.hbs?raw';
import { Button } from '@/shared';

interface IError {
  status: string;
  text: string;
}
export default class Error extends Block {
  constructor(props: IError) {
    super('div', {
      ...props,
      Button: new Button({ type: 'outline', label: 'Назад к чатам' }),
    }, { className: 'error-block' });
  }

  render(): string {
    return template;
  }
}
