import { MyShoppingListService } from '../my-shopping-list.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as SLActions from './shopping-list.actions';
import { switchMap } from 'rxjs/operators';

Injectable();
export class ShoppingListEffects {
  constructor (private actions$: Actions, private SLService: MyShoppingListService) {}

}
