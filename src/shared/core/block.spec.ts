/* eslint-disable */
import sinon from 'sinon';
import { expect } from 'chai';
import Block from './block.ts';

describe('Block', () => {
  let PageComponent:any;

  before(() => {
    class Page extends Block {
      constructor(props: any) {
        super('div', props);
      }

      render() {
        return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`;
      }
    }

    PageComponent = Page;
  });

  // написать тест на то что комопнент создается с переданными пропсами
  it('Должен создать компонент с состоянием из конструктора', () => {
    const text = 'Hello';

    const pageComponent = new PageComponent({ text });

    const spanText = pageComponent._element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });
  // проверить что реактивность у копонента работает
  it('Компонент должен иметь реактивное повдение', () => {
    const newValue = 'New value';

    const pageComponent = new PageComponent({ text: 'Hello' });

    pageComponent.setProps({ text: newValue });
    const spanText = pageComponent._element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(newValue);
  });
  // проверить что комопнент навешивает события
  it('Компонент должен установить события на элемент', () => {
    const clickhadnlerStub = sinon.stub();
    const pageComponent = new PageComponent({
      events: {
        click: clickhadnlerStub,
      },
    });

    const event = new MouseEvent('click');
    pageComponent._element?.dispatchEvent(event);

    expect(clickhadnlerStub.calledOnce).to.be.true;
  });

  it('Компонент должен скрываться/показываться', () => {
    const pageComponent = new PageComponent();

    pageComponent.show();
    expect(pageComponent.getContent()?.style.display).to.equal('block');
    pageComponent.hide();
    expect(pageComponent.getContent()?.style.display).to.equal('none');
  });
});
