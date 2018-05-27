import { Item } from './../item.model';
import * as ItemsActions from './../actions/items.actions';

export interface ItemsState {
    loading: string;
    items: Item[];
}

export const initialItemsState: ItemsState = {
    loading: 'not initialised',
    items: []
};

export function itemsReducer(state = initialItemsState, action: ItemsActions.Actions): ItemsState {
    switch (action.type) {
      case ItemsActions.LOAD_ITEMS: {
        console.log('[ItemsReducer] Load Items action called', state);
        const newState = {...state, loading: 'now loading...'};
        console.log('[ItemsReducer] Load Items action new state', newState);
        return newState;
      }
      case ItemsActions.LOAD_ITEMS_SUCCESS: {
        console.log('[ItemsReducer] Load Items Success action called', state, action.payload);
        const newState = {...state, loading: 'done loading', items: action.payload};
        console.log('[ItemsReducer] Load Items Success new state: ', newState);
        return newState;
      }
      default: {
        return state;
      }
    }
}
