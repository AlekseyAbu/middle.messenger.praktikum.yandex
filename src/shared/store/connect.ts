import { StoreEvents } from './store';
import isEqual from '../utils/isEqual';

export function connect(mapStateToProps: any) {
  return function (Component: any) {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: any) {
        // @ts-ignore
        const { store } = window;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        };

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        (window as any).store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
