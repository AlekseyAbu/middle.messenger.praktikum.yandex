import Route from './Route';

export interface RouteInterface {
  render: (route: RouteInterface, pathname: string) => void; // Исправлена сигнатура render
  match: (path: string) => boolean;
  leave: () => void;
}

class Router {
  public routes: RouteInterface[] = [];

  private static __instance: Router; // Статическая инстанция

  private history: History | undefined; // История браузера

  private _currentRoute: RouteInterface | null = null; // Текущий маршрут

  private readonly _rootQuery: string | undefined; // Корневой элемент

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: any): Router { // Добавлены типы и возврат this
    // @ts-expect-error
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start(): void {
    // @ts-expect-error
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute(window.location.pathname); // Исправлено получение pathname
    });
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void { // Приватный метод
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(route, pathname); // Теперь соответствует интерфейсу
  }

  go(pathname: string): void {
    // @ts-expect-error
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    // @ts-expect-error
    this.history.back();
  }

  forward(): void {
    // @ts-expect-error
    this.history.forward();
  }

  getRoute(pathname: string): RouteInterface | undefined {
    const route = this.routes.find((route) => route.match(pathname));
    return route || this.routes.find((route) => route.match('*')); // Упрощен возврат
  }
}

export default Router;
