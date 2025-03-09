import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './eventBus.ts';

type Options = {
  className?: string,
  attr?: Record<string, string>
}

type Children = Record<string, Block | Block[]>;

// Нельзя создавать экземпляр данного класса
export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private _options: Options;

  private _element: HTMLElement | null = null;

  private _meta: { tagName: string; props: Record<string, any> };

  private _id: string;

  public children: Children;

  public props: Record<string, any>;

  private eventBus: () => EventBus<string, Record<string, any[]>>;

  constructor(tagName: string = 'div', propsWithChildren: Record<string, any> = {}, options: Options = {}) {
    const eventBus: EventBus<string, Record<string, any[]>> = new EventBus();
    this.eventBus = () => eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this._id = nanoid(6);
    this.props = this._makePropsProxy(props);
    this._options = options;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus<string, Record<string, any[]>>): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);

    if (this._options?.className) {
      const classes = this._options.className.split(' ');
      this._element.classList.add(...classes);
    }

    if (this._options?.attr) {
      Object.entries(this._options.attr).forEach(([attrName, attrValue]) => {
        this._element?.setAttribute(attrName, attrValue as string);
      });
    }
  }

  private init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _getChildrenAndProps(propsAndChildren: Record<string, any>): { children: Children; props: Record<string, any> } {
    const children: Children = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (obj instanceof Block) {
            if (!children[key]) {
              children[key] = [];
            }
            (children[key] as Block[]).push(obj);
          } else {
            props[key] = value;
          }
        });
        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  public componentDidMount(oldProps?: Record<string, any>): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  public componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
    return oldProps !== newProps;
  }

  public setProps = (nextProps: Record<string, any>): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _addEvents(): void {
    const { events = {} } = this.props as { events: Record<string, () => void> };
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props as { events: Record<string, () => void> };
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _compile(): DocumentFragment {
    const propsAndStubs = { ...this.props } as Record<string, any>;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(
          (component) => `<div data-id="${component._id}"></div>`,
        );
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach((child) => {
          const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
          stub?.replaceWith(child.getContent()!);
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
        stub?.replaceWith(component.getContent()!);
      }
    });

    return fragment.content;
  }

  private _render(): void {
    this._removeEvents();
    const block = this._compile();

    if (this._element?.children.length === 0) {
      this._element.appendChild(block);
    } else {
      this._element?.replaceChildren(block);
    }

    this._addEvents();
  }

  public render(): string {
    return '';
  }

  public getContent(): HTMLElement | null {
    return this._element;
  }

  private _makePropsProxy(props: Record<string, any>): Record<string, any> {
    const eventBus = this.eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props, {
      get(target: Record<string, any>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, any>, prop: string, value: any) {
        const oldTarget = { ...target };
        target[prop] = value;
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  public show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
