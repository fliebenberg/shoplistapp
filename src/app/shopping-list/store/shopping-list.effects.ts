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
        return this.SLService.convertToSL(slObject);
      });
      console.log('[SLEffects] Effect LOAD_SHOPPING_LISTS calling action LOAD_SHOPPING_LISTS_SUCCESS', newSLList);
      return new SLActions.LoadShoppingListsSuccess(newSLList);
    })
  );
  @Effect()
  addShoppingList$: Observable<Action> = this.actions$.pipe(
    ofType(SLActions.ADD_SHOPPING_LIST),
    switchMap((action: SLActions.AddShoppingList) => {
      return this.SLService.saveShoppingList(action.payload)
      .then(
        () => {
          console.log('[SLEffects] Effect ADD_SHOPPING_LIST calling action ADD_SHOPPING_LIST_SUCCESS', action.payload);
          return new SLActions.AddShoppingListSuccess(action.payload);
        },
        (error) => {
          console.log('[SLEffects] Effect ADD_SHOPPING_LIST calling action ADD_SHOPPING_LIST_FAILURE', error, action.payload);
          return new SLActions.AddShoppingListFailure(action.payload);
        }
      );
    })
  );
  @Effect()
  deleteShoppingList$: Observable<Action> = this.actions$.pipe(
    ofType(SLActions.DELETE_SHOPPING_LIST),
    switchMap((action: SLActions.DeleteShoppingList) => {
      return this.SLService.deleteShoppingList(action.payload)
      .then(
        () => {
          console.log('[SLEffects] Effect DELETE_SHOPPING_LIST calling action DELETE_SHOPPING_LIST_SUCCESS', action.payload);
          return new SLActions.DeleteShoppingListSuccess(action.payload);
        },
        (error) => {
          console.log('[SLEffects] Effect DELETE_SHOPPING_LIST calling action DELETE_SHOPPING_LIST_FAILURE', error, action.payload);
          return new SLActions.DeleteShoppingListFailure(action.payload);
        }
      );
    })
  );
  @Effect()
  updateShoppingList$: Observable<Action> = this.actions$.pipe(
    ofType(SLActions.UPDATE_SHOPPING_LIST),
    switchMap((action: SLActions.UpdateShoppingList) => {
      const SLToUpdate: ShoppingList = this.SLService.getShoppingList(action.payload);
      console.log('[SLEffects] Efect UPDATE_SHOPPING_LIST SLToUpdate:', SLToUpdate);
      return this.SLService.saveShoppingList(SLToUpdate)
      .then(
        () => {
          console.log('[SLEffects] Effect UPDATE_SHOPPING_LIST calling action UPDATE_SHOPPING_LIST_SUCCESS', SLToUpdate);
          return new SLActions.UpdateShoppingListSuccess(SLToUpdate);
        },
        (error) => {
          console.log('[SLEffects] Effect UPDATE_SHOPPING_LIST calling action UPDATE_SHOPPING_LIST_FAILURE', error, SLToUpdate);
          return new SLActions.UpdateShoppingListFailure(SLToUpdate);
        }
      );
    })
  );
  @Effect()
  IncreaseSLItem$: Observable<Action> = this.actions$.pipe(
    ofType(SLActions.INCREASE_SL_ITEM),
    map((action: SLActions.IncreaseSLItem) => {
      console.log('[SLEffects] Effect IncreaseSLItem calling action UPDATE_SHOPPING_LIST', action.payload.SL);
      return new SLActions.UpdateShoppingList(action.payload.SL);
    })
  );
  @Effect()
  DecreaseSLItem$: Observable<Action> = this.actions$.pipe(
    ofType(SLActions.DECREASE_SL_ITEM),
    map((action: SLActions.DecreaseSLItem) => {
      console.log('[SLEffects] Effect DecreaseSLItem calling action UPDATE_SHOPPING_LIST', action.payload.SL);
      return new SLActions.UpdateShoppingList(action.payload.SL);
    })
  );

}
