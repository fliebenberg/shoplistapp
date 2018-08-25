import { MyAuthService } from './../core/services/my-auth.service';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { firestore } from 'firebase/app';
import { ShoppingList, SLIST } from './models/shopping-list.model';
import { ShoppingListsState, getSLLoading, getSLArray } from './store/shopping-list.reducer';
import * as SLActions from './store/shopping-list.actions';
import { UserState, getUser } from '../user/store/user.reducer';
import { User } from './../user/models/user.model';
import { ListItem } from './models/list-item.model';

@Injectable({
  providedIn: 'root'
})
export class MyShoppingListService {
  slCollection: AngularFirestoreCollection<ShoppingList>;
  // shoppingLists$: Observable<ShoppingList[]>;
  slMap: Map<string, ShoppingList>;
  slLoading = true;
  user$: Observable<User>;
  currentUserId: string;

  constructor(
    private afStore: AngularFirestore,
    private slStore: Store<ShoppingListsState>,
    private userStore: Store<UserState>) {
      this.afStore.firestore.settings({timestampsInSnapshots: true});  // needed to set this to take account of changes in firestore
      this.slCollection = this.afStore.collection('shoppingLists');
      this.userStore.select(getUser).subscribe((user: User) => {
        if (user) {
          if (user.id && user.id !== this.currentUserId) {
            console.log('[SLService] User changed: New UserId:' + user.id);
            this.currentUserId = user.id;
            this.afStore.collection('shoppingLists', ref => ref.where('users.' + user.id, '==', 'owner')).valueChanges()
              .subscribe(slAsOwner => {
                console.log('[SLService] SLSub calling action LOAD_SHOPPINGLISTS', slAsOwner);
                const slCombined = [...slAsOwner];
                this.slStore.dispatch(new SLActions.LoadShoppingLists(slCombined));
              });
          }
        } else {
            console.log('[SLService] No user loaded', user);
            this.slStore.dispatch( new SLActions.LoadShoppingListsFailure('No user loaded...'));
        }
      });
      this.slStore.select(getSLArray).subscribe(shoppingLists => {
        this.slMap = this.createSLMap(shoppingLists);
        console.log('[SLService] slMap updated.', this.slMap);
      });
      this.slStore.select(getSLLoading).subscribe(loading => {
        this.slLoading = loading;
      });
  }
  // function to create a ShoppingList item from a shopping list object loaded from Firebase
  convertToSL(slObject: any): ShoppingList {
    // console.log('[slService] covertToSL slObject:', slObject);
    const newSL = new ShoppingList();
    if (slObject) {
      if (slObject.id) {
        newSL.id = slObject.id;
      }
      if (slObject.listType) { newSL.listType = slObject.listType; }
      if (slObject.name) { newSL.name = slObject.name; }
      if (slObject.description) { newSL.description = slObject.description; }
      if (slObject.dateCreated) { newSL.dateCreated = slObject.dateCreated; }
      if (slObject.users) { newSL.users = slObject.users; }
      if (slObject.itemsList) { newSL.itemsList = slObject.itemsList; }
        // newSL.itemsList = new Map();
        // slObject.itemsList.forEach((listItem: ListItem) => {
        //   newSL.itemsList.set(listItem.item.id, listItem);
        // })''
      // }
    }
    // console.log('[slService] covertToSL newSL:', newSL);
    return newSL;
  }

  createNewSL(listType?: string): ShoppingList {
    const newSL = new ShoppingList();
    newSL.id = this.afStore.createId();
    if (this.currentUserId) {
      newSL.users[this.currentUserId] = 'owner';
    }
    if (listType) {
      newSL.listType = listType;
      if (listType === SLIST) {
        newSL.name = "Shopping List ";
      } else {
        newSL.name = "Quick List ";
      }
      newSL.name += newSL.dateCreated.toDate().toLocaleDateString(undefined,
        { day: 'numeric',
          month: 'short',
          year: 'numeric'
        }
      );
    }
    this.slMap.set(newSL.id, newSL);
    console.log('[SLService] New shopping list created', newSL);

    return newSL;
  }

  createSLMap(shoppingLists: ShoppingList[]): Map<string, ShoppingList> {
    const newMap = new Map();
    shoppingLists.forEach((shoppingList: ShoppingList) => {
      newMap.set(shoppingList.id, shoppingList);
    });
    return newMap;
  }

  getShoppingList(slId: string): ShoppingList {
    let foundSL = null;
    if (!this.slLoading) {
      foundSL = this.slMap.get(slId);
    } else {
      console.log('[SLService][getShoppingList] Error: Shopping Lists not loaded');
    }
    if (!foundSL) {
      console.log('[SLService] [getShoppingList] Shopping list id not found.', slId);
    }
    return foundSL;
  }

  saveShoppingList(shoppingList: ShoppingList): Promise<any> {
    // console.log('[SLService][saveList] Saving Shopping List to firebase', shoppingList);
    if (!shoppingList.id || shoppingList.id.length === 0) {
      shoppingList.id = this.afStore.createId();
      console.log('[SLService][saveList] New id created: ' + shoppingList.id);
    }
    // if (shoppingList.itemsList) {
    //   const saveableItemsList = Array.from(shoppingList.itemsList.values());
    //   delete shoppingList.itemsList;
    //   const saveableSL = {...shoppingList, itemsList: saveableItemsList};
    //   return this.slCollection.doc(shoppingList.id).set(Object.assign({}, saveableSL));
    // } else {
    return this.slCollection.doc(shoppingList.id).set(Object.assign({}, shoppingList));
    // }
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
