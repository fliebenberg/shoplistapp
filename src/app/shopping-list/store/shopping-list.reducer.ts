import { ListItem } from './../models/list-item.model';
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
      return {...state, loading: true, shoppingLists: []};
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
      console.log('[ShoppingListReducer] Action UPDATE_SHOPPING_LIST_SUCCESS called', action.payload, state.currentSL);
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
    case SLActions.INCREASE_SL_ITEM: {
      console.log('[ShoppingListReducer] Action INCREASE_SL_ITEM called', action.payload);
      const newSL: ShoppingList = {...state.currentSL};
      if (newSL.itemsList) {
        let foundItem = false;
        newSL.itemsList = newSL.itemsList.map((listItem: ListItem) => {
          if (!foundItem && listItem.item.id === action.payload.item.id) {
            listItem.qNeeded ++;
            listItem.qToBuy ++;
            foundItem = true;
          }
          return listItem;
        });
        if (!foundItem) {
          newSL.itemsList.push({item: action.payload.item, qNeeded: 1, qStock: 0, qToBuy: 1});
        }
      } else {
        console.log('[ShoppingListReducer] No itemsList found. NewSL:', newSL);
        newSL.itemsList = [{item: action.payload.item, qNeeded: 1, qStock: 0, qToBuy: 1}];
        console.log('[ShoppingListReducer] New itemsList created. NewSL:', newSL);
      }
      let newSLArray = [...state.shoppingLists];
      newSLArray = newSLArray.map((SL: ShoppingList) => {
        if (SL.id === newSL.id) {
          return newSL;
        } else { return SL; }
      });
      const newState = {...state, currentSL: newSL, shoppingLists: newSLArray};
      console.log('[ShoppingListReducer] New State:', newState);
      return {...newState};
    }
    case SLActions.DECREASE_SL_ITEM: {
      console.log('[ShoppingListReducer] Action DECREASE_SL_ITEM called', action.payload);
      const newSL: ShoppingList = {...state.currentSL};
      if (newSL.itemsList) {
        let foundItem = false;
        let deleteItem = -1;
        newSL.itemsList = newSL.itemsList.map((listItem: ListItem, index: number) => {
          if (!foundItem && listItem.item.id === action.payload.item.id) {
            listItem.qNeeded --;
            listItem.qToBuy --;
            foundItem = true;
            if (listItem.qNeeded <= 0) {
              deleteItem = index;
              console.log('[SLReducer] Item need to be deleted. Item index: ' + deleteItem, listItem);
            }
          }
          return listItem;
        });
        if (deleteItem >= 0) {
          console.log('[SLReducer] Item to be deleted. deleteItem: ' + deleteItem, newSL);
          newSL.itemsList.splice(deleteItem, 1);
          console.log('[SLReducer] Item deleted. newSL:',  newSL);
        }
      } else {
        console.log('[ShoppingListReducer] No itemsList found. NewSL:', newSL);
      }
      let newSLArray = [...state.shoppingLists];
      newSLArray = newSLArray.map((SL: ShoppingList) => {
        if (SL.id === newSL.id) {
          return newSL;
        } else { return SL; }
      });
      const newState = {...state, currentSL: newSL, shoppingLists: newSLArray};
      console.log('[ShoppingListReducer] New State:', newState);
      return {...newState};
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
