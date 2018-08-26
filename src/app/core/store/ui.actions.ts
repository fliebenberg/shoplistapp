import { Action } from '@ngrx/store';

export const SHOW_BACK_BUTTON = '[ui] Show the back button';
export const HIDE_BACK_BUTTON = '[ui] Hide the back button';

export class ShowBackButton implements Action {
  readonly type = SHOW_BACK_BUTTON;
  constructor (public payload: string) {} // description of previous page
}

export class HideBackButton implements Action {
  readonly type = HIDE_BACK_BUTTON;
}

export type Actions =
  ShowBackButton |
  HideBackButton;
