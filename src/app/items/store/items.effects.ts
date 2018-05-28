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
        switchMap((action) => {
            return this.itemsService.getItems().pipe(
                map((items: Item[]) => {
                    console.log('[ItemsEffects] Calling LoadItemsSuccess...');
                    const newAction = new ItemsActions.LoadItemsSuccess(items);
                    console.log('[ItemsEffects] LoadItemsSuccess action: ', newAction);
                    return newAction;
                })
            );
        })
    );
}
