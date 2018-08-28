import { ListItem } from './../models/list-item.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingList } from './../models/shopping-list.model';
import * as SLActions from './shopping-list.actions';
import { QuickList } from '../models/quick-list.model';
import { ListQL } from '../models/list-ql.model';

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
  loading: false,
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
      return {...initialSLState};
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
      const newSLArray = updateSLArray([...state.shoppingLists], newSL);
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
      const newSLArray = updateSLArray([...state.shoppingLists], newSL);
      const newState = {...state, currentSL: newSL, shoppingLists: newSLArray};
      console.log('[ShoppingListReducer] New State:', newState);
      return {...newState};
    }
    case SLActions.INCREASE_SL_QLIST: {
      console.log('[ShoppingListReducer] Action INCREASE_SL_QLIST called', action.payload);
      const newSL: ShoppingList = {...state.currentSL};
      if (newSL.quickLists) {
        let foundQList = false;
        newSL.quickLists = newSL.quickLists.map((listQL: ListQL) => {
          if (!foundQList && listQL.quickList.id === action.payload.quickList.id) {
            listQL.qNeeded ++;
            newSL.itemsList = addQLItemsToSL(listQL.quickList, newSL);
            foundQList = true;
          }
          return listQL;
        });
        if (!foundQList) {
          newSL.quickLists.push({quickList: action.payload.quickList, qNeeded: 1});
          newSL.itemsList = addQLItemsToSL(action.payload.quickList, newSL);
        }
      } else {
        console.log('[ShoppingListReducer] No quickLists found. NewSL:', newSL);
        newSL.quickLists = [{quickList: action.payload.quickList, qNeeded: 1}];
        newSL.itemsList = addQLItemsToSL(action.payload.quickList, newSL);
        console.log('[ShoppingListReducer] New quickLists created. NewSL:', newSL);
      }
      const newSLArray = updateSLArray([...state.shoppingLists], newSL);
      const newState = {...state, currentSL: newSL, shoppingLists: newSLArray};
      console.log('[ShoppingListReducer] New State:', newState);
      return {...newState};
    }
    case SLActions.DECREASE_SL_QLIST: {
      console.log('[ShoppingListReducer] Action DECREASE_SL_QLIST called', action.payload);
      const newSL: ShoppingList = {...state.currentSL};
      if (newSL.quickLists) {
        let foundQList = false;
        let deleteQList = -1;
        newSL.quickLists = newSL.quickLists.map((listQL: ListQL, index: number) => {
          if (!foundQList && listQL.quickList.id === action.payload.quickList.id) {
            listQL.qNeeded --;
            if (listQL.qNeeded <= 0) {
              deleteQList = index;
            }
            // newSL.itemsList = addQLItemsToSL(listQL.quickList, newSL);
            foundQList = true;
          }
          return listQL;
        });
        if (deleteQList >= 0) {
          newSL.quickLists.splice(deleteQList, 1);
        }
      } else {
        console.log('[ShoppingListReducer] No quickLists found. NewSL:', newSL);
      }
      const newSLArray = updateSLArray([...state.shoppingLists], newSL);
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


function updateSLArray(oldSLArray: ShoppingList[], newSL: ShoppingList): ShoppingList[] {
  const newSLArray = oldSLArray.map((SL: ShoppingList) => {
    if (SL.id === newSL.id) {
      return newSL;
    } else { return SL; }
  });
  return newSLArray;
}

function addQLItemsToSL(ql: ShoppingList, sl: ShoppingList): ListItem[] {
  const newSL = {...sl};
  ql.itemsList.forEach((qlListItem: ListItem) => {
    let foundQLItem = false;
    newSL.itemsList = newSL.itemsList.map((slListItem: ListItem) => {
      if (!foundQLItem && slListItem.item.id === qlListItem.item.id) {
        slListItem.qNeeded += qlListItem.qNeeded;
        slListItem.qToBuy += qlListItem.qNeeded;
        foundQLItem = true;
      }
      return slListItem;
    });
    if (!foundQLItem) {
      newSL.itemsList.push({item: qlListItem.item, qNeeded: qlListItem.qNeeded, qStock: 0, qToBuy: qlListItem.qNeeded});
    }
  });
  return newSL.itemsList;
}
