import { firestore } from 'firebase/app';
import { ShoppingList } from './models/shopping-list.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { ShoppingListsState, getSLState, getSLLoading } from './store/shopping-list.reducer';
import * as SLActions from './store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class MyShoppingListService {
  slCollection: AngularFirestoreCollection<ShoppingList>;
  slMap: Map<string, ShoppingList>;
  slLoading = true;

  constructor(
    private afStore: AngularFirestore,
    private store: Store<ShoppingListsState>) {
      this.afStore.firestore.settings({timestampsInSnapshots: true});  // needed to set this to take account of changes in firestore
      this.fbShoppingListsSubscribe();
    }

  fbShoppingListsSubscribe() {
    this.store.select(getSLLoading).subscribe(loading => {
      this.slLoading = loading;
    });
    this.slCollection = this.afStore.collection('shoppingLists');
    console.log('[SLService] About to subscribe to FB shoppingLists');
    this.slCollection.valueChanges().subscribe(
      (shoppingLists: ShoppingList[]) => {
        if (shoppingLists) {
          console.log('[SLService] About to dispatch LoadShoppingListsSuccess action', shoppingLists);
          this.store.dispatch(new SLActions.LoadShoppingListsSuccess(shoppingLists));
          this.slMap = new Map();
          shoppingLists.forEach((shoppingList: ShoppingList) => {
            this.slMap.set(shoppingList.id, shoppingList);
          });
        } else {
          console.log('[SLService] Could not load ShoppingLists');
        }
      },
      (error) => {
        console.log('[SLService] About to dis[atch LoadShoppingListsFailure action');
        this.store.dispatch(new SLActions.LoadShoppingListsFailure(error));
      }
    );
  }

  getShoppingList(slId: string): ShoppingList {
    let foundSL = null;
    if (!this.slLoading) {
      foundSL = this.slMap.get(slId);
    } else {
      console.log('[SLService][getShoppingList] Error: Shopping Lists not loaded');
    }
    return foundSL;
  }

  saveShoppingList(shoppingList: ShoppingList): Promise<any> {
    console.log('[SLService][saveList] Saving Shopping List to firebase', shoppingList);
    if (!shoppingList.id || shoppingList.id.length === 0) {
      shoppingList.id = this.afStore.createId();
      console.log('[SLService][saveList] New id created: ' + shoppingList.id);
    }
    return this.slCollection.doc(shoppingList.id).set(Object.assign({}, shoppingList));
  }

  deleteShoppingList(shoppingList: ShoppingList): Promise<any> {
    return this.slCollection.doc(shoppingList.id).delete();
  }

  formatDate(date: firestore.Timestamp): string {
    return date.toDate().toLocaleString(undefined, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
