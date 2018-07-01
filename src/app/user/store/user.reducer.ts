import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from './../models/user.model';
import * as UserActions from './user.actions';

export interface UserState {
  user: User;
  loading: boolean;
  updating: boolean;
  deleting: boolean;
}

export const initialSLState: UserState = {
  user: null,
  loading: true,
  updating: false,
  deleting: false,
};

export function userReducer(state = initialSLState, action: UserActions.Actions): UserState {
  switch (action.type) {
    case UserActions.LOAD_USER: {
      console.log('[UserReducer] Action LOAD_USER called', action.payload);
      return {...state, loading: true};
    }
    case UserActions.LOAD_USER_SUCCESS: {
      console.log('[UserReducer] Action LOAD_USER_SUCCESS called', action.payload);
      return {...state, loading: false, user: action.payload};
    }
    case UserActions.LOAD_USER_FAILURE: {
      console.log('[UserReducer] Action LOAD_USER_FAILURE called', action.payload);
      return {...state, loading: true};
    }
    case UserActions.ADD_USER: {
      console.log('[UserReducer] Action ADD_USER called', action.payload);
      return {...state, updating: true};
    }
    case UserActions.ADD_USER_SUCCESS: {
      console.log('[UserReducer] Action ADD_USER_SUCCESS called', action.payload);
      return {...state, updating: false, user: action.payload};
    }
    case UserActions.ADD_USER_FAILURE: {
      console.log('[UserReducer] Action ADD_USER_FAILURE called', action.payload);
      return {...state, updating: true};
    }
    case UserActions.UPDATE_USER: {
      console.log('[UserReducer] Action UPDATE_USER called', action.payload);
      return {...state, updating: true};
    }
    case UserActions.UPDATE_USER_SUCCESS: {
      console.log('[UserReducer] Action UPDATE_USER_SUCCESS called', action.payload);
      return {...state, updating: false};
    }
    case UserActions.UPDATE_USER_FAILURE: {
      console.log('[UserReducer] Action UPDATE_USER_FAILURE called', action.payload);
      return {...state, updating: false};
    }
    case UserActions.CLEAR_USER: {
      console.log('[UserReducer] Action CLEAR_USER called');
      return {...state, user: null};
    }
    case UserActions.DELETE_USER: {
      console.log('[UserReducer] Action DELETE_USER called', action.payload);
      return {...state, deleting: true};
    }
    case UserActions.DELETE_USER_SUCCESS: {
      console.log('[UserReducer] Action DELETE_USER_SUCCESS called', action.payload);
      return {...state, deleting: false};
    }
    case UserActions.TOGGLE_EXCLUDE_CATEGORY: {
      console.log('[UserReducer] Action TOGGLE_EXCLUDE_CATEGORY called', action.payload);
      return {...state, user: action.payload.user};
    }
    case UserActions.ADD_EXCLUDE_CATEGORY: {
      console.log('[UserReducer] Action ADD_EXCLUDE_CATEGORY called', action.payload);
      const tempUser = {...state.user};
      if (!tempUser.excludeCategories.includes(action.payload)) { tempUser.excludeCategories.push(action.payload); }
      return {...state, user: tempUser};
    }
    case UserActions.DELETE_EXCLUDE_CATEGORY: {
      console.log('[UserReducer] Action DELETE_EXCLUDE_CATEGORY called', action.payload);
      const tempUser = {...state.user};
      tempUser.excludeCategories = tempUser.excludeCategories.filter(category => {
          return category !== action.payload;
        });
      return {...state, user: tempUser};
    }
    default: {
      // console.log('[UserReducer] Unhandled action', action);
      return state;
    }
  }
}

export const getUserState = createFeatureSelector<UserState>('userState');
export const getUser = createSelector(getUserState, userState => userState.user);
export const getUserLoading = createSelector(getUserState, userState => userState.loading);
