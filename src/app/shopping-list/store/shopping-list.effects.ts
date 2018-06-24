import { ShoppingList } from './../models/shopping-list.model';
import { MyShoppingListService } from '../my-shopping-list.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as SLActions from './shopping-list.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class ShoppingListEffects {
  constructor (private actions$: Actions, private SLService: MyShoppingListService) {}
  @Effect()
  loadShoppingLists$: Observable<Action> = this.actions$.pipe(
    ofType(SLActions.LOAD_SHOPPING_LISTS),
    map((action: SLActions.LoadShoppingLists) => {
      const newSLList = action.payload.map((slObject: any) => {
        return this.SLService.createShoppingList(slObject);
      });
      console.log('[SLEffects] Effect LOAD_SHOPPING_LISTS calling action LOAD_SHOPPING_LISTS_SUCCESS', newSLList);
      return new SLActions.LoadShoppingListsSuccess(newSLList);
    })
  );

}
