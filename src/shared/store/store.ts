import EventBus from '@/shared/core/EventBus';

export enum StoreEvents {
  Updated = 'Updated',
}

type Indexed<T = any> = {
  [key: string]: T;
};

export class Store extends EventBus {
  private state: Indexed | undefined;

  private static __instance: Store;

  constructor(defaultState: Indexed = {}) {
    super();

    if (Store.__instance) {
      return Store.__instance;
    }

    this.state = defaultState;
    Store.__instance = this;
  }

  public getState(): Indexed {
    if (this.state) {
      return this.state;
    }
    return {};
  }

  public set(nextState: Indexed): void {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...nextState };
    // @ts-expect-error не нашел способ ее исправить
    this.emit(StoreEvents.Updated, prevState, this.state);
  }
}
