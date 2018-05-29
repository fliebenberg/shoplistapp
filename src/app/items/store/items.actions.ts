import { Action } from "@ngrx/store";
import { Item } from "../item.model";

// Load items list from Firebase
export const LOAD_ITEMS = '[items] Load Items';
export const LOAD_ITEMS_SUCCESS = '[items] Items Loaded Successfully';
export const UPDATE_CATEGORIES = '[items] Update Item Categories';

export class LoadItems implements Action {
    readonly type = LOAD_ITEMS;
}

export class LoadItemsSuccess implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;
    constructor (public payload: Item[]) {}
}

export class UpdateCategories implements Action {
    readonly type = UPDATE_CATEGORIES;
    constructor (public payload: Map<string, boolean>) {}
}

export type Actions =
    LoadItems |
    LoadItemsSuccess |
    UpdateCategories;
