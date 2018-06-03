import { ShoppingList } from './../models/shopping-list.model';
import { Action } from "@ngrx/store";

// Load items list from Firebase
export const LOAD_SHOPPING_LISTS = '[shopping list] Load Shopping Lists';
export const LOAD_SHOPPING_LISTS_SUCCESS = '[shopping list] Shopping Lists Loaded Successfully';
export const LOAD_SHOPPING_LISTS_FAILURE = '[shopping list] Shopping Lists Not Loaded Successfully';
export const DELETE_SHOPPING_LIST = '[shopping list] Delete Shopping List';

export class LoadShoppingLists implements Action {
    readonly type = LOAD_SHOPPING_LISTS;
}

export class LoadShoppingListsSuccess implements Action {
    readonly type = LOAD_SHOPPING_LISTS_SUCCESS;
    constructor (public payload: ShoppingList[]) {} // shoppingList array
}

export class LoadShoppingListsFailure implements Action {
    readonly type = LOAD_SHOPPING_LISTS_FAILURE;
    constructor (public payload: any) {} // error
}

export class DeleteShoppingList implements Action {
    readonly type = DELETE_SHOPPING_LIST;
    constructor (public payload: ShoppingList) {} // ShoppingList object to be deleted
}

export type Actions =
    LoadShoppingLists |
    LoadShoppingListsSuccess |
    LoadShoppingListsFailure |
    DeleteShoppingList;
