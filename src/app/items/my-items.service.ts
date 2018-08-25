import { UserState, getUser } from './../user/store/user.reducer';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, throwError, Subject, combineLatest } from 'rxjs';

import { Item } from './models/item.model';
import { Store } from '@ngrx/store';
import { ItemsState, getLoading } from './store/items.reducer';
import * as ItemsActions from './store/items.actions';
import { MyMessageService } from '../core/services/my-message.service';

@Injectable({
  providedIn: 'root'
})
export class MyItemsService {
  items: Item[] = [];
  itemsMap: Map<string, Item> = new Map();
  fbItems$: Observable<Item[]>;
  loadingItems: boolean;
  itemsCollection: AngularFirestoreCollection<Item>;
  categoriesFilterCount = 0;

  // filteredItems: Item[] = [];
  // filteredItemsSubject = new Subject<Item[]>();
  categoriesMap: Map<string, boolean> = new Map();
  excludeCategories: string[] = [];
  // filters = {
  //   searchFilter: '',
  //   categoryFilter: ['']
  // };

  constructor(
    public afStore: AngularFirestore,
    public itemsStore: Store<ItemsState>,
    public userStore: Store<UserState>,
    public messageService: MyMessageService
  ) {
    this.afStore.firestore.settings({timestampsInSnapshots: true});  // needed to set this to take account of changes in firestore

    this.fbItemsSubscribe();
  }

  fbItemsSubscribe() {
    this.itemsStore.select(getLoading).subscribe(loading => {
      this.loadingItems = loading;
    });
    this.userStore.select(getUser).subscribe(user => {
      if (user && user.excludeCategories) {
        this.excludeCategories = user.excludeCategories;
      } else {
        this.excludeCategories = [];
      }
      console.log('ItemsService] Updating categories because of user change', user, this.excludeCategories);
      this.itemsStore.dispatch(new ItemsActions.UpdateCategories(this.updateCategories(this.items, this.excludeCategories)));
    });
    this.itemsCollection = this.afStore.collection('items');
    // console.log('[ItemsService] About to subscribe to firebase...');
    this.fbItems$ = this.itemsCollection.valueChanges();
    this.fbItems$.subscribe(
      (items) => {
        // console.log('[ItemsService] About to dispatch action LoadItemsSuccess');
        this.itemsStore.dispatch(new ItemsActions.LoadItemsSuccess(items));
        this.items = items;
        this.itemsMap = new Map();
        items.forEach(item => {
          this.itemsMap.set(item.id, item);
        });
      },
      error => {
        // console.log('[ItemsService] About to dispatch action LoadItemsFailure', error);
        this.itemsStore.dispatch(new ItemsActions.LoadItemsFailure(error));
      }
    );
  }

  // get itemsFilters$(): Observable<ItemsFilter> {
  //   return this.itemsFiltersSubject.asObservable();
  // }

  getItem(itemId: string): Item {
    let foundItem = null;
    if (!this.loadingItems) {
      foundItem = this.itemsMap.get(itemId);
    } else {
      // console.log('[ItemsService][getItem] Error: Items not loaded');
    }
    return foundItem;
  }

  saveItem(item: Item): Promise<any> {
    // console.log('[ItemsService][saveItem] Saving Item to firebase', item);
    if (!item.id || item.id.length === 0) {
      item.id = this.afStore.createId();
      // console.log('[ItemsService][SaveItem] New id created: ' + item.id);
    }
    return this.itemsCollection.doc(item.id).set(Object.assign({}, item));
  }

  deleteItem(itemId: string): Promise<any> {
    return this.itemsCollection.doc(itemId).delete();
  }

  filterItems(items: Item[], searchText?: string, categories?: Map<string, boolean>): Item[] {
    const searchTextExist = searchText && searchText.length > 0;
    const categoriesExist = categories && categories.size > 0;
    return [...items].filter(item => {
      let include = true;
      if (searchTextExist && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
        include = false;
      }
      if ( categoriesExist && !categories.get(item.category)) {
        include = false;
      }
      return include;
    });
  }

  updateCategories(items: Item[], excludeCategories?: string[]): Map<string, boolean> {
    // console.log('[ItemsService] updateCategories starting', excludeCategories);
    const tempCategories = [];
    items.forEach(item => {
      if (!tempCategories.includes(item.category)) {
        tempCategories.push(item.category);
      }
    });
    // console.log('[ItemsService] updateCategories step 2', tempCategories);
    const tempCategoriesMap = new Map();
    tempCategories.sort().forEach(category => {
      // console.log('[ItemsService] updateCategories : current category: ' + category);
      if (excludeCategories && excludeCategories.includes(category)) {
        // console.log('[ItemsService] updateCategories : excluding category ' + category);
        tempCategoriesMap.set(category, false);
      } else {
        // console.log('[ItemsService] updateCategories : including category ' + category);
        tempCategoriesMap.set(category, true);
      }
    });
    return tempCategoriesMap;
  }

  get categories(): string[] {
    return Array.from(this.categoriesMap.keys());
  }

  // get filteredCategories(): string[] {
  //   const tempArray: string[] = [];
  //   this.categoriesMap.forEach((value: boolean, key: string) => {
  //     if (!value) {
  //       tempArray.push(key);
  //     }
  //   });
  //   return tempArray;
  // }
}
