import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { UIState } from '../store/ui.reducer';
import * as UIActions from '../store/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class MyParamService {

  constructor(public route: ActivatedRoute, uiStore: Store<UIState>) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log('[ParamService] Checking route params: ', params);
      if (params.get('back')) {
        uiStore.dispatch(new UIActions.ShowBackButton());
      } else {
        uiStore.dispatch(new UIActions.HideBackButton());
      }
  });
  }
}
