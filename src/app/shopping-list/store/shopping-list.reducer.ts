import { ShoppingList } from './../models/shopping-list.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListsState {
  shoppingLists: ShoppingList[];
  loading: boolean;
}

export const initialShoppingListsState: ShoppingListsState = {
  shoppingLists: [],
  loading: true,
};

export function shoppingListReducer(state = initialShoppingListsState, action: ShoppingListActions.Actions): ShoppingListsState {
  switch (action.type) {
    case ShoppingListActions.LOAD_SHOPPING_LISTS: {
      console.log('[ShoppingListReducer] Action LOAD_SHOPPING_LISTS called');
      return {...state, loading: true};
    }
    case ShoppingListActions.LOAD_SHOPPING_LISTS_SUCCESS: {
      console.log('[ShoppingListReducer] Action LOAD_SHOPPING_LISTS_SUCCESS called');
      return {...state, loading: false, shoppingLists: action.payload};
    }
    default: return state;
  }
}
