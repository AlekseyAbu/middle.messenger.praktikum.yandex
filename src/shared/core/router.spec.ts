/* eslint-disable */
import sinon from 'sinon';
import { expect } from 'chai';
import Router from './Router.ts';
import Route from './Route.ts';

describe('Router', () => {
  let router: Router;
  let MockRoute: any;
  let sandbox: sinon.SinonSandbox;
  const rootQuery = '#test-root';

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Мокируем только методы history, а не весь объект
    const historyStub = {
      pushState: sandbox.stub(),
      back: sandbox.stub(),
      forward: sandbox.stub(),
    };
    sandbox.stub(window, 'history').value(historyStub);

    // Вместо мокирования location - управляем путем через history
    window.history.pushState({}, '', '/initial');

    // Мок для Route
    MockRoute = class {
      render = sandbox.stub();
      leave = sandbox.stub();
      match = sandbox.stub().returns(false);
    };

    router = new Router(rootQuery);
  });

  afterEach(() => {
    sandbox.restore();
    // Сбрасываем синглтон
    delete (Router as any).__instance;
  });

  it('Должен быть синглтоном', () => {
    const anotherRouter = new Router(rootQuery);
    expect(router).to.eq(anotherRouter);
  });

  it('Должен добавлять маршруты через use()', () => {
    const path = '/test';
    const block = {} as any;

    router.use(path, block);

    expect(router.routes.length).to.eq(1);
    expect(router.routes[0]).to.be.instanceOf(Route);
  });

  it('Должен изменять маршрут при вызове go()', () => {
    const newPath = '/new-path';
    const mockRoute = new MockRoute();
    mockRoute.match.returns(true);
    router.routes.push(mockRoute);

    router.go(newPath);

    expect(mockRoute.render.calledOnce).to.be.true;
  });

  it('Должен вызывать back/forward истории', () => {
    router.back();
    expect(window.history.back.calledOnce).to.be.true;

    router.forward();
    expect(window.history.forward.calledOnce).to.be.true;
  });

  it('Должен перейти на маршрут "*" если совпадений нет', () => {
    const block = {} as any;
    router.use('*', block);
    router.start();

    router.go('/non-existent');
    expect(router['currentRoute'].pathname).to.equal('*');
  });

});
