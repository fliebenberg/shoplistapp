import { Action } from "@ngrx/store";
import { Item } from "../item.model";

// Load items list from Firebase
export const LOAD_ITEMS = '[items] Load Items';
export const LOAD_ITEMS_SUCCESS = '[items] Items Loaded Successfully';
export const UPDATE_CATEGORIES = '[items] Update Item Categories';
export const TOGGLE_CATEGORY_INCLUDE = '[items] Toggle Category Include';

export class LoadItems implements Action {
    readonly type = LOAD_ITEMS;
}

export class LoadItemsSuccess implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;
    constructor (public payload: Item[]) {} // items array
}

export class UpdateCategories implements Action {
    readonly type = UPDATE_CATEGORIES;
    constructor (public payload: Map<string, boolean>) {} // categoriesMap
}

export class ToggleCategoryInclude implements Action {
    readonly type = TOGGLE_CATEGORY_INCLUDE;
    constructor (public payload: string) {} // category name
}

export type Actions =
    LoadItems |
    LoadItemsSuccess |
    UpdateCategories |
    ToggleCategoryInclude;
