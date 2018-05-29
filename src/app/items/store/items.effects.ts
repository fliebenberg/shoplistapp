import { Item } from '../item.model';
import { MyItemsService } from '../../services/my-items.service';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, mergeMap, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as ItemsActions from './items.actions';

@Injectable()
export class ItemsEffects {
    constructor(private actions$: Actions, private itemsService: MyItemsService) {}

    @Effect()
    loadItems$: Observable<Action> = this.actions$.pipe(
        ofType(ItemsActions.LOAD_ITEMS),
        switchMap((action: ItemsActions.LoadItems) => {
            console.log('[ItemsEffects] Handling Load Items effect...');
            return this.itemsService.fbItems$.pipe(
                map((items: Item[]) => {
                    console.log('[ItemsEffects] Calling LoadItemsSuccess...');
                    return new ItemsActions.LoadItemsSuccess(items);
                })
            );
        })
    );

    @Effect()
    loadItemsSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(ItemsActions.LOAD_ITEMS_SUCCESS),
        map((action: ItemsActions.LoadItemsSuccess) => {
            console.log('[ItemsEffects] Calling UpdateCategories...');
            return new ItemsActions.UpdateCategories(this.itemsService.updateCategories(action.payload));
        })
    );
}
