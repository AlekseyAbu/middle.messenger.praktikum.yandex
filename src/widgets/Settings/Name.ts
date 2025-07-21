import Block from '@/shared/core/block.ts';

interface IName {
  name?: string,
}

export default class Name extends Block {
  constructor(props: IName) {
    const {
      name,
    } = props;
    super('span', {
      name,
    }, {
      className: '',
    });
  }

  public componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.name !== newProps.name) {
      this.setProps({ name: newProps.name });

      return true;
    }

    return false;
  }

  render(): string {
    return '<span class="setting-name">{{name}}</span>';
  }
}
