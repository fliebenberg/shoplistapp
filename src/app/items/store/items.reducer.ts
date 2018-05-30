import { ItemsState } from './items.reducer';
import { Item } from '../item.model';
import * as ItemsActions from './items.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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
        console.log('[ItemsReducer] Action LOAD_ITEMS called', state);
        return {...state, loading: true};
      }
      case ItemsActions.LOAD_ITEMS_SUCCESS: {
        console.log('[ItemsReducer] Action LOAD_ITEMS_SUCCESS called', state, action.payload);
        return {...state, loading: false, items: action.payload};
      }
      case ItemsActions.UPDATE_CATEGORIES: {
        console.log('[ItemsReducer] Action UPDATE_CATEGORIES called', state, action.payload);
        return {...state, categories: action.payload};
      }
      case ItemsActions.TOGGLE_CATEGORY_INCLUDE: {
        console.log('[ItemsReducer] Action TOGGLE_CATEGORY_INCLUDE called', state, action.payload);
        const newCategoriesMap = new Map(state.categories.set(action.payload, !state.categories.get(action.payload)));
        return {...state, categories: newCategoriesMap};
      }
      default: {
        console.log('[ItemsReducer] Unhandled action', action);
        return state;
      }
    }
}

export const getItemsState = createFeatureSelector<ItemsState>('itemsState');

export const getItems = createSelector(getItemsState, itemsState => itemsState.items);
export const getCategoriesMap = createSelector(getItemsState, itemsSate => itemsSate.categories);
export const getCategoriesExcludeCount = createSelector(getCategoriesMap, categoriesMap => {
  let count = 0;
  categoriesMap.forEach((include, category) => {
    if (!include) {
      count ++;
    }
  });
  return count;
})
export const getLoading = createSelector(getItemsState, itemsState => itemsState.loading);
