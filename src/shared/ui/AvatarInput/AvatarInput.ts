import Block from '../../core/block';
// import template from './avatarInput.hbs?raw';

interface IAvatarInput {
  onChange?: (event: InputEvent) => void,
}

export default class AvatarInput extends Block {
  constructor(props: IAvatarInput) {
    super('input', {
      events: {
        change: props.onChange,
      },
    }, {
      className: 'avatar-upload',
      attr: {
        type: 'file',
        name: 'avatar',
        placeholder: 'Upload avatar',
      },
    });
  }

  render(): string {
    return '';
  }
}
