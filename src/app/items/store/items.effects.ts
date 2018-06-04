import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, mergeMap, map, switchMap } from 'rxjs/operators';
import { Item } from '../item.model';
import * as ItemsActions from './items.actions';
import { MyItemsService } from '../../services/my-items.service';
import { MyMessageService, MessageType } from './../../services/my-message.service';

@Injectable()
export class ItemsEffects {
    constructor(private actions$: Actions, private itemsService: MyItemsService, private messageService: MyMessageService) {}

    @Effect()
    loadItems$: Observable<Action> = this.actions$.pipe(
        ofType(ItemsActions.LOAD_ITEMS),
        switchMap((action: ItemsActions.LoadItems) => {
            return this.itemsService.fbItems$.pipe(
                map((items: Item[]) => {
                    console.log('[ItemsEffects] Effect LoadItems Calling Action LoadItemsSuccess');
                    return new ItemsActions.LoadItemsSuccess(items);
                })
            );
        })
    );

    @Effect()
    loadItemsSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(ItemsActions.LOAD_ITEMS_SUCCESS),
        map((action: ItemsActions.LoadItemsSuccess) => {
            console.log('[ItemsEffects] Effect LoadItemsSuccess Calling Action UpdateCategories');
            return new ItemsActions.UpdateCategories(this.itemsService.updateCategories(action.payload));
        })
    );

    @Effect()
    loadItemsFailure$: Observable<Action> = this.actions$.pipe(
        ofType(ItemsActions.LOAD_ITEMS_FAILURE),
        tap((action: ItemsActions.LoadItemsFailure) => {
            console.log('[ItemsEffects] Effect LoadItemsFailure Waiting 5 seconds to try again...', action.payload);
            this.messageService.addMessage('Problem loading items. Will try again in 5 seconds.', MessageType.error, 5000);
            setTimeout(() => action, 5000);
        }),
        map((action: ItemsActions.LoadItemsFailure) => {
            console.log('[ItemsEffects] Effect LoadItemsFailure Calling Action LoadItems');
            return new ItemsActions.LoadItems();
        })
    );
}
