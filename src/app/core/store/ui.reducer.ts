import * as UIActions from './ui.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UIState {
  showBackButton: boolean;
}

export const initialUIState: UIState = {
  showBackButton: false
};

export function UIReducer (state = initialUIState, action: UIActions.Actions): UIState {
  switch (action.type) {
    case UIActions.SHOW_BACK_BUTTON: {
      console.log('[UIReducer] Action SHOW_BACK_BUTTON called', state);
      return state = {...state, showBackButton: true};
    }
    case UIActions.HIDE_BACK_BUTTON: {
      console.log('[UIReducer] Action HIDE_BACK_BUTTON called', state);
      return state = {...state, showBackButton: false};
    }
    default: {
      return state;
    }
  }
}

export const getUIState = createFeatureSelector<UIState>('uiState');
export const getShowBackButton = createSelector(getUIState, uiState => uiState.showBackButton);
