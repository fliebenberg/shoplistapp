import { Action } from "@ngrx/store";
import { Item } from "../models/item.model";

// Load items list from Firebase
export const LOAD_ITEMS = '[items] Load Items';
export const LOAD_ITEMS_SUCCESS = '[items] Items Loaded Successfully';
export const LOAD_ITEMS_FAILURE = '[items] Items Not Loaded Successfully';
export const DELETE_ITEM = '[items] Delete item';
export const UPDATE_CATEGORIES = '[items] Update Item Categories';
export const TOGGLE_CATEGORY_INCLUDE = '[items] Toggle Category Include';
export const SET_SELECTED_ITEM = '[items] Set the currently selected item';

export class LoadItems implements Action {
    readonly type = LOAD_ITEMS;
}

export class LoadItemsSuccess implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;
    constructor (public payload: Item[]) {} // items array
}

export class LoadItemsFailure implements Action {
    readonly type = LOAD_ITEMS_FAILURE;
    constructor (public payload: any) {} // items array
}

export class DeleteItem implements Action {
    readonly type = DELETE_ITEM;
    constructor (public payload: Item) {} // Item object to be deleted
}

export class UpdateCategories implements Action {
    readonly type = UPDATE_CATEGORIES;
    constructor (public payload: Map<string, boolean>) {} // categoriesMap
}

export class ToggleCategoryInclude implements Action {
    readonly type = TOGGLE_CATEGORY_INCLUDE;
    constructor (public payload: string) {} // category name
}

export class SetSelectedItem implements Action {
    readonly type = SET_SELECTED_ITEM;
    constructor (public payload: Item) {} // category name
}

export type Actions =
    LoadItems |
    LoadItemsSuccess |
    LoadItemsFailure |
    DeleteItem |
    UpdateCategories |
    ToggleCategoryInclude |
    SetSelectedItem;
