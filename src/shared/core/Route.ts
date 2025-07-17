import { RouteInterface } from './Router';

// Интерфейс для блоков (компонентов)
interface Block {
  getContent(): HTMLElement;
  componentDidMount?(): void;
  hide?(): void;
}

// Параметры конструктора Route
interface RouteProps {
  rootQuery: string;
}

class Route implements RouteInterface {
  private _pathname: string;

  private _blockClass: new (props: any) => Block;

  private _block: Block | null = null;

  private _props: RouteProps;

  constructor(
    pathname: string,
    view: new (props: any) => Block,
    props: RouteProps,
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block && this._block.hide) {
      // Раскомментировать, если реализован метод hide
      // this._block.hide();
    }
    this._block = null; // Важно: освобождаем ресурсы
  }

  match(pathname: string): boolean {
    // Поддержка wildcard роутов
    if (this._pathname === '*') return true;
    return pathname === this._pathname;
  }

  private _renderDom(query: string, block: Block) {
    const root = document.querySelector(query);

    if (!root) {
      throw new Error(`Root element not found by selector: ${query}`);
    }

    root.innerHTML = '';
    root.append(block.getContent());
  }

  render(_route?: RouteInterface, _pathname?: string): void {
    if (!this._block) {
      // Создаем экземпляр блока с пустыми props
      // (можно передавать актуальные параметры при необходимости)
      this._block = new this._blockClass({});
    }

    // Раскомментировать, если реализован метод show
    // if (this._block.show) this._block.show();

    this._renderDom(this._props.rootQuery, this._block);

    if (this._block.componentDidMount) {
      this._block.componentDidMount();
    }
  }
}

export default Route;
