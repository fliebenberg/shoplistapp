import { Action } from "@ngrx/store";
import { Item } from "../item.model";

// Load items list from Firebase
export const LOAD_ITEMS = '[items] Load Items';
export const LOAD_ITEMS_SUCCESS = '[items] Items Loaded successfully';

export class LoadItems implements Action {
    readonly type = LOAD_ITEMS;
}

export class LoadItemsSuccess implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;
    constructor (public payload: Item[]) {}
}

export type Actions =
    LoadItems |
    LoadItemsSuccess;
