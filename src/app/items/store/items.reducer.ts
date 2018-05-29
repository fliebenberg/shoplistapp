import { Item } from '../item.model';
import * as ItemsActions from './items.actions';

export interface ItemsState {
    loading: boolean;
    items: Item[];
    categories: Map<string, boolean>;
}

export const initialItemsState: ItemsState = {
    loading: false,
    items: [],
    categories: new Map()
};

export function itemsReducer(state = initialItemsState, action: ItemsActions.Actions): ItemsState {
    switch (action.type) {
      case ItemsActions.LOAD_ITEMS: {
        console.log('[ItemsReducer] Load Items action called', state);
        return {...state, loading: true};
      }
      case ItemsActions.LOAD_ITEMS_SUCCESS: {
        console.log('[ItemsReducer] Load Items Success action called', state, action.payload);
        return {...state, loading: false, items: action.payload};
      }
      case ItemsActions.UPDATE_CATEGORIES: {
        console.log('[ItemsReducer] Update Categories action called', state, action.payload);
        return {...state, categories: action.payload};
      }
      default: {
        return state;
      }
    }
}
