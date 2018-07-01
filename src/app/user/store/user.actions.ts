import { User } from './../models/user.model';
import { Action } from "@ngrx/store";

// Load items list from Firebase
export const LOAD_USER = '[user] Load User';
export const LOAD_USER_SUCCESS = '[user] User Loaded Successfully';
export const LOAD_USER_FAILURE = '[user] User Not Loaded Successfully';
export const ADD_USER = '[user] Add User';
export const ADD_USER_SUCCESS = '[user] User Added Succesfully';
export const ADD_USER_FAILURE = '[user] User Not Added Succesfully';
export const UPDATE_USER = '[user] Update User';
export const UPDATE_USER_SUCCESS = '[user] User Updated Successfully';
export const UPDATE_USER_FAILURE = '[user] User Not Updated Successfully';
export const CLEAR_USER = '[user] Clear user (User logged out)';
export const DELETE_USER = '[user] Delete User';
export const DELETE_USER_SUCCESS = '[user] User Deleted Successfully';
export const DELETE_USER_FAILURE = '[user] User Not Deleted Successfully';
export const TOGGLE_EXCLUDE_CATEGORY = '[user] Toggle whether a category is excluded';
export const ADD_EXCLUDE_CATEGORY = '[user] Add a category to exclude';
export const DELETE_EXCLUDE_CATEGORY = '[user] Delete a category to exclude';

export class LoadUser implements Action {
    readonly type = LOAD_USER;
    constructor (public payload: User) {} // user object
}

export class LoadUserSuccess implements Action {
    readonly type = LOAD_USER_SUCCESS;
    constructor (public payload: User) {} // shoppingList array
}

export class LoadUserFailure implements Action {
    readonly type = LOAD_USER_FAILURE;
    constructor (public payload: any) {} // error
}

export class AddUser implements Action {
    readonly type = ADD_USER;
    constructor (public payload: any) {} // user credential
}

export class AddUserSuccess implements Action {
    readonly type = ADD_USER_SUCCESS;
    constructor (public payload: User) {} // User
}

export class AddUserFailure implements Action {
    readonly type = ADD_USER_FAILURE;
    constructor (public payload: any) {} // error
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor (public payload: User) {} // User
}

export class UpdateUserSuccess implements Action {
    readonly type = UPDATE_USER_SUCCESS;
    constructor (public payload: User) {} // User
}

export class UpdateUserFailure implements Action {
    readonly type = UPDATE_USER_FAILURE;
    constructor (public payload: any) {} // error
}

export class ClearUser implements Action {
    readonly type = CLEAR_USER;
}

export class DeleteUser implements Action {
    readonly type = DELETE_USER;
    constructor (public payload: User) {} // ShoppingList object to be deleted
}

export class DeleteUserSuccess implements Action {
    readonly type = DELETE_USER_SUCCESS;
    constructor (public payload: User) {} // ShoppingList object to be deleted
}

export class DeleteUserFailure implements Action {
    readonly type = DELETE_USER_FAILURE;
    constructor (public payload: any) {} // ShoppingList object to be deleted
}

export class ToggleExcludeCategory implements Action {
    readonly type = TOGGLE_EXCLUDE_CATEGORY;
    constructor (public payload: {category: string, user: User}) {} // Category to toggle and user
}

export class AddExcludeCategory implements Action {
    readonly type = ADD_EXCLUDE_CATEGORY;
    constructor (public payload: string) {} // Category to add to exclude list
}

export class DeleteExcludeCategory implements Action {
    readonly type = DELETE_EXCLUDE_CATEGORY;
    constructor (public payload: string) {} // Category to delete from exclude list
}

export type Actions =
    LoadUser |
    LoadUserSuccess |
    LoadUserFailure |
    AddUser |
    AddUserSuccess |
    AddUserFailure |
    UpdateUser |
    UpdateUserSuccess |
    UpdateUserFailure |
    ClearUser |
    DeleteUser |
    DeleteUserSuccess |
    DeleteUserFailure |
    ToggleExcludeCategory |
    AddExcludeCategory |
    DeleteExcludeCategory;
