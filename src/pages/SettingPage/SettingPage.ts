import Block from '@/shared/core/block.ts';
import template from './SettingPage.hbs?raw';
import { Settings } from '@/widgets';
import { Button } from '@/shared';
import { ROUTER } from '@/shared/constants/constants.ts';
import { connect } from '@/shared/store/connect.ts';

class ServerErrorPage extends Block {
  constructor() {
    super('div', {
      Setting: new Settings({ name: '' }),
      ButtonBack: new Button({
        type: 'outline',
        label: 'Назад к чатам',
        onClick: () => { (window as any).router.go(ROUTER.chats); },
      }),
    }, { className: 'setting' });
  }

  componentDidUpdate(): boolean {
    if (this.props.user) {
      const data = JSON.parse(this.props.user);
      (this.children.Setting as Block).setProps({ nameFirst: data.first_name });
      console.log(this.props.user.first_name, 'this.props.user.first_name');
      return true;
    }
    return true;
  }

  render(): string {
    return template;
  }
}

const mapStateToProps = (state: Record<string, any>) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ServerErrorPage);
