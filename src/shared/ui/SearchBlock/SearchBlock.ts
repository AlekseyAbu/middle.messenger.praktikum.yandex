import Block from '@/shared/core/block.ts';
import template from './SearchBlock.hbs?raw';
import { Input } from '@/shared';

interface ISearchBlock {
  onChange?: () => void,
}

export default class SearchBlock extends Block {
  constructor(props: ISearchBlock) {
    const { onChange } = props;
    super('div', {
      ...props,
      Input: new Input({
        onChange,
        class: 'search__input',
        placeholder: 'Поиск',
      }),
    }, {
      className: 'search',
    });
  }

  render(): string {
    return template;
  }
}
