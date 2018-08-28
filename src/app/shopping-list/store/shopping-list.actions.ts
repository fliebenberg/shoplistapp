import { QuickList } from './../models/quick-list.model';
import { ShoppingList } from './../models/shopping-list.model';
import { Action } from "@ngrx/store";
import { Item } from '../../items/models/item.model';

// Load items list from Firebase
export const LOAD_SHOPPING_LISTS = '[shopping list] Load Shopping Lists';
export const LOAD_SHOPPING_LISTS_SUCCESS = '[shopping list] Shopping Lists Loaded Successfully';
export const LOAD_SHOPPING_LISTS_FAILURE = '[shopping list] Shopping Lists Not Loaded Successfully';
export const ADD_SHOPPING_LIST = '[shopping list] Add Shopping List';
export const ADD_SHOPPING_LIST_SUCCESS = '[shopping list] Shopping List Added Successfully';
export const ADD_SHOPPING_LIST_FAILURE = '[shopping list] Shopping List Not Added Successfully';
export const DELETE_SHOPPING_LIST = '[shopping list] Delete Shopping List';
export const DELETE_SHOPPING_LIST_SUCCESS = '[shopping list] Shopping List Deleted Successfully';
export const DELETE_SHOPPING_LIST_FAILURE = '[shopping list] Shopping List Not Deleted Successfully';
export const CLEAR_SHOPPING_LISTS = '[shopping list] Clear all shopping lists from store';
export const UPDATE_SHOPPING_LIST = '[shopping list] Update Shopping List';
export const UPDATE_SHOPPING_LIST_SUCCESS = '[shopping list] Shopping List Updated Successfully';
export const UPDATE_SHOPPING_LIST_FAILURE = '[shopping list] Shopping List Not Updated Successfully';
export const SET_CURRENT_SHOPPING_LIST = '[shopping list] Set Current Shopping List';
export const LOAD_SL_ITEMS = '[shopping list] Load items for the specified Shopping List';
export const INCREASE_SL_ITEM = '[shopping list] Increase item in the specified Shopping List';
export const DECREASE_SL_ITEM = '[shopping list] Decrease item in the specified Shopping List';
export const INCREASE_SL_QLIST = '[shopping list] Increase QList in the specified Shopping List';
export const DECREASE_SL_QLIST = '[shopping list] Decrease QList in the specified Shopping List';

export class LoadShoppingLists implements Action {
    readonly type = LOAD_SHOPPING_LISTS;
    constructor (public payload: any[]) {} // list of shoppingList objects from firebase
}

export class LoadShoppingListsSuccess implements Action {
    readonly type = LOAD_SHOPPING_LISTS_SUCCESS;
    constructor (public payload: ShoppingList[]) {} // shoppingList array
}

export class LoadShoppingListsFailure implements Action {
    readonly type = LOAD_SHOPPING_LISTS_FAILURE;
    constructor (public payload: any) {} // error
}

export class AddShoppingList implements Action {
    readonly type = ADD_SHOPPING_LIST;
    constructor (public payload: ShoppingList) {} // ShoppingList to be added
}

export class AddShoppingListSuccess implements Action {
    readonly type = ADD_SHOPPING_LIST_SUCCESS;
    constructor (public payload: ShoppingList) {} // ShoppingList that was added
}

export class AddShoppingListFailure implements Action {
    readonly type = ADD_SHOPPING_LIST_FAILURE;
    constructor (public payload: ShoppingList) {} // ShoppingList that could not be added
}

export class DeleteShoppingList implements Action {
    readonly type = DELETE_SHOPPING_LIST;
    constructor (public payload: ShoppingList) {} // ShoppingList to be deleted
}

export class DeleteShoppingListSuccess implements Action {
    readonly type = DELETE_SHOPPING_LIST_SUCCESS;
    constructor (public payload: ShoppingList) {} // ShoppingList to be deleted
}

export class DeleteShoppingListFailure implements Action {
    readonly type = DELETE_SHOPPING_LIST_FAILURE;
    constructor (public payload: ShoppingList) {} // ShoppingList to be deleted
}

export class ClearShoppingLists implements Action {
    readonly type = CLEAR_SHOPPING_LISTS;
    // constructor (public payload: ShoppingList) {} // ShoppingList to be deleted
}

export class UpdateShoppingList implements Action {
    readonly type = UPDATE_SHOPPING_LIST;
    constructor (public payload: string) {} // Id of ShoppingList to be updated
}

export class UpdateShoppingListSuccess implements Action {
    readonly type = UPDATE_SHOPPING_LIST_SUCCESS;
    constructor (public payload: ShoppingList) {} // ShoppingList that has been updated
}

export class UpdateShoppingListFailure implements Action {
    readonly type = UPDATE_SHOPPING_LIST_FAILURE;
    constructor (public payload: ShoppingList) {} // ShoppingList that could not be updated
}

export class SetCurrentShoppingList implements Action {
    readonly type = SET_CURRENT_SHOPPING_LIST;
    constructor (public payload: ShoppingList) {} // ShoppingList to set as current
}

export class LoadSLItems implements Action {
    readonly type = LOAD_SL_ITEMS;
    constructor (public payload: string) {} // ShoppingList id to load items for
}

export class IncreaseSLItem implements Action {
    readonly type = INCREASE_SL_ITEM;
    constructor (public payload: {item: Item, SL: string}) {} // Item to add to Shoppinglist, Id if shoppinglist
}

export class DecreaseSLItem implements Action {
    readonly type = DECREASE_SL_ITEM;
    constructor (public payload: {item: Item, SL: string}) {} // Item to add to Shoppinglist, Id of shoppinglist
}

export class IncreaseSLQList implements Action {
    readonly type = INCREASE_SL_QLIST;
    constructor (public payload: {quickList: ShoppingList, SL: string}) {} // QList to add to / increase in Shoppinglist SL
}

export class DecreaseSLQList implements Action {
    readonly type = DECREASE_SL_QLIST;
    constructor (public payload: {quickList: ShoppingList, SL: string}) {} // QList to decrease in Shoppinglist SL
}

export type Actions =
    LoadShoppingLists |
    LoadShoppingListsSuccess |
    LoadShoppingListsFailure |
    AddShoppingList |
    AddShoppingListSuccess |
    AddShoppingListFailure |
    DeleteShoppingList |
    DeleteShoppingListSuccess |
    DeleteShoppingListFailure |
    ClearShoppingLists |
    UpdateShoppingList |
    UpdateShoppingListSuccess |
    UpdateShoppingListFailure |
    SetCurrentShoppingList |
    LoadSLItems |
    IncreaseSLItem |
    DecreaseSLItem |
    IncreaseSLQList |
    DecreaseSLQList;
