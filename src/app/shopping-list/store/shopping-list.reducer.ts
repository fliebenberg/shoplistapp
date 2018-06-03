import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingList } from './../models/shopping-list.model';
import * as SLActions from './shopping-list.actions';

export interface ShoppingListsState {
  shoppingLists: ShoppingList[];
  loading: boolean;
}

export const initialSLState: ShoppingListsState = {
  shoppingLists: [],
  loading: true,
};

export function shoppingListReducer(state = initialSLState, action: SLActions.Actions): ShoppingListsState {
  switch (action.type) {
    case SLActions.LOAD_SHOPPING_LISTS: {
      console.log('[ShoppingListReducer] Action LOAD_SHOPPING_LISTS called');
      return {...state, loading: true};
    }
    case SLActions.LOAD_SHOPPING_LISTS_SUCCESS: {
      console.log('[ShoppingListReducer] Action LOAD_SHOPPING_LISTS_SUCCESS called');
      return {...state, loading: false, shoppingLists: action.payload};
    }
    case SLActions.LOAD_SHOPPING_LISTS_FAILURE: {
      console.log('[ShoppingListReducer] Action LOAD_SHOPPING_LISTS_FAILURE called', action.payload);
      return {...state, loading: true};
    }
    default: {
      console.log('[ShoppingListReducer] Unhandled action', action);
      return state;
    }
  }
}

export const getSLState = createFeatureSelector<ShoppingListsState>('shoppingListsState');
export const getSLArray = createSelector(getSLState, slState => slState.shoppingLists);
export const getSLLoading = createSelector(getSLState, slState => slState.loading);
