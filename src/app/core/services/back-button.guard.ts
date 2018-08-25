import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Store } from '@ngrx/store';
import { UIState } from '../store/ui.reducer';
import * as UIActions from '../store/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class BackButtonGuard implements CanActivate, CanActivateChild {
  constructor(private uiStore: Store<UIState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('[BackButtonGuard]', route, state);
    if (route.paramMap.has('back')) {
      this.uiStore.dispatch(new UIActions.ShowBackButton());
    } else {
      this.uiStore.dispatch(new UIActions.HideBackButton());
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
