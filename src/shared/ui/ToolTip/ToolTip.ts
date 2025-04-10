import Block from '@/shared/core/block.ts';
import template from './ToolTip.hbs?raw';
import { ToolTipItem } from '@/shared/ui/ToolTipItem';

interface IToolTip {
  onClick: (type) => void,
}

export default class ToolTip extends Block {
  constructor(props: IToolTip) {
    const {
      onClick,
    } = props;
    super('div', {
      AddUser: new ToolTipItem({
        value: 'Добавить пользователя',
        type: 'addUser',
        onClick,
      }),

      DeleteUser: new ToolTipItem({
        value: 'Удалить пользователя',
        type: 'deleteUser',
        onClick,
      }),

      AddChat: new ToolTipItem({
        value: 'Добавить чат',
        type: 'addChats',
        onClick,
      }),
    }, {
      className: 'tooltip',
    });
  }

  render(): string {
    return template;
  }
}
