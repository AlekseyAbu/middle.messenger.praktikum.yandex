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

  public componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.src !== newProps.src) {
      this.setProps({ value: newProps.src });

      return true;
    }

    return false;
  }

  render(): string {
    return template;
  }
}
