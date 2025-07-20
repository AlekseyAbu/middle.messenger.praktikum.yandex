import Block from '@/shared/core/block.ts';
import template from './Avatar.hbs?raw';

interface IAvatar {
  src: string,
  size: string,
  name?: string,
  customClass?: string,
  onClick?: () => void,
}

export default class Avatar extends Block {
  constructor(props: IAvatar) {
    const {
      src, size, name, customClass, onClick,
    } = props;
    super('div', {
      src,
      name,
      customClass,
      events: {
        click: onClick,
      },
    }, {
      className: `avatar size__${size}`,
    });
  }

  render(): string {
    return template;
  }
}
