import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingList } from './../models/shopping-list.model';
import * as SLActions from './shopping-list.actions';

export interface ShoppingListsState {
  shoppingLists: ShoppingList[];
  currentSL: ShoppingList;
  loading: boolean;
  adding: boolean;
  updating: boolean;
  deleting: boolean;
}

export const initialSLState: ShoppingListsState = {
  shoppingLists: [],
  currentSL: null,
  loading: true,
  updating: false,
  adding: false,
  deleting: false,
};

export function shoppingListReducer(state = initialSLState, action: SLActions.Actions): ShoppingListsState {
  switch (action.type) {
    case SLActions.LOAD_SHOPPING_LISTS: {
      console.log('[ShoppingListReducer] Action LOAD_SHOPPING_LISTS called', action.payload);
      return {...state, loading: true};
    }
    case SLActions.LOAD_SHOPPING_LISTS_SUCCESS: {
      console.log('[ShoppingListReducer] Action LOAD_SHOPPING_LISTS_SUCCESS called', action.payload);
      return {...state, loading: false, shoppingLists: action.payload};
    }
    case SLActions.LOAD_SHOPPING_LISTS_FAILURE: {
      console.log('[ShoppingListReducer] Action LOAD_SHOPPING_LISTS_FAILURE called', action.payload);
      return {...state, loading: false, shoppingLists: []};
    }
    case SLActions.ADD_SHOPPING_LIST: {
      console.log('[ShoppingListReducer] Action ADD_SHOPPING_LIST called', action.payload);
      return {...state, adding: true};
    }
    case SLActions.ADD_SHOPPING_LIST_SUCCESS: {
      console.log('[ShoppingListReducer] Action ADD_SHOPPING_LIST_SUCCESS called', action.payload);
      return {...state, adding: false};
    }
    case SLActions.ADD_SHOPPING_LIST_FAILURE: {
      console.log('[ShoppingListReducer] Action ADD_SHOPPING_LIST_FAILURE called', action.payload);
      return {...state, adding: false};
    }
    case SLActions.DELETE_SHOPPING_LIST: {
      console.log('[ShoppingListReducer] Action DELETE_SHOPPING_LIST called', action.payload);
      return {...state, deleting: true};
    }
    case SLActions.DELETE_SHOPPING_LIST_SUCCESS: {
      console.log('[ShoppingListReducer] Action DELETE_SHOPPING_LIST_SUCCESS called', action.payload);
      return {...state, deleting: false};
    }
    case SLActions.DELETE_SHOPPING_LIST_FAILURE: {
      console.log('[ShoppingListReducer] Action DELETE_SHOPPING_LIST_FAILURE called', action.payload);
      return {...state, deleting: false};
    }
    case SLActions.CLEAR_SHOPPING_LISTS: {
      console.log('[ShoppingListReducer] Action CLEAR_SHOPPING_LISTS called');
      return {...state, shoppingLists: []};
    }
    case SLActions.UPDATE_SHOPPING_LIST: {
      console.log('[ShoppingListReducer] Action UPDATE_SHOPPING_LIST called', action.payload);
      return {...state, updating: true};
    }
    case SLActions.UPDATE_SHOPPING_LIST_SUCCESS: {
      console.log('[ShoppingListReducer] Action UPDATE_SHOPPING_LIST_SUCCESS called', action.payload);
      return {...state, updating: false};
    }
    case SLActions.UPDATE_SHOPPING_LIST_SUCCESS: {
      console.log('[ShoppingListReducer] Action UPDATE_SHOPPING_LIST_SUCCESS called', action.payload);
      return {...state, updating: false};
    }
    case SLActions.SET_CURRENT_SHOPPING_LIST: {
      console.log('[ShoppingListReducer] Action SET_CURRENT_SHOPPING_LIST called', action.payload);
      return {...state, currentSL: action.payload};
    }
    default: {
      // console.log('[ShoppingListReducer] Unhandled action', action);
      return state;
    }
  }
}

export const getSLState = createFeatureSelector<ShoppingListsState>('shoppingListsState');
export const getSLArray = createSelector(getSLState, slState => slState.shoppingLists);
export const getCurrentSL = createSelector(getSLState, slState => slState.currentSL);
export const getSLLoading = createSelector(getSLState, slState => slState.loading);
