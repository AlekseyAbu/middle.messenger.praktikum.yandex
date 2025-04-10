import Block from '@/shared/core/block.ts';
import template from './ToolTipItem.hbs?raw';

interface IToolTipItem {
  value: string,
  type: string,
  onClick: (type) => void,
}

export default class ToolTipItem extends Block {
  constructor(props: IToolTipItem) {
    const {
      value, onClick, type,
    } = props;
    super('div', {
      value,
      events: {
        click: () => onClick(type),
      },
    }, { className: 'tooltip-item' });
  }

  render(): string {
    return template;
  }
}
