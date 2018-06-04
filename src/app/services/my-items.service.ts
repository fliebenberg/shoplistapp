import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, throwError, Subject } from 'rxjs';

import { Item } from './../items/models/item.model';
import { Store } from '@ngrx/store';
import { ItemsState, getLoading } from './../items/store/items.reducer';
import * as ItemsActions from './../items/store/items.actions';
import { MyMessageService } from './my-message.service';

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
  // filters = {
  //   searchFilter: '',
  //   categoryFilter: ['']
  // };

  constructor(
    public afStore: AngularFirestore,
    public store: Store<ItemsState>,
    public messageService: MyMessageService
  ) {
    this.afStore.firestore.settings({timestampsInSnapshots: true});  // needed to set this to take account of changes in firestore

    this.fbItemsSubscribe();
  }

  fbItemsSubscribe() {
    this.store.select(getLoading).subscribe(loading => {
      this.loadingItems = loading;
    });
    this.itemsCollection = this.afStore.collection('items');
    this.fbItems$ = this.itemsCollection.valueChanges();
    console.log('[ItemsService] About to subscribe to firebase...');
    this.fbItems$.subscribe(
      items => {
        console.log('[ItemsService] About to dispatch action LoadItemsSuccess');
        this.store.dispatch(new ItemsActions.LoadItemsSuccess(items));
        // this.items = items;
        this.itemsMap = new Map();
        items.forEach(item => {
          this.itemsMap.set(item.id, item);
        });
      },
      error => {
        console.log('[ItemsService] About to dispatch action LoadItemsFailure', error);
        this.store.dispatch(new ItemsActions.LoadItemsFailure(error));
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
      console.log('[ItemsService][getItem] Error: Items not loaded');
    }
    return foundItem;
  }

  saveItem(item: Item): Promise<any> {
    console.log('[ItemsService][saveItem] Saving Item to firebase', item);
    if (!item.id || item.id.length === 0) {
      item.id = this.afStore.createId();
      console.log('[ItemsService][SaveItem] New id created: ' + item.id);
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

  updateCategories(items: Item[], categories?: Map<string, boolean>): Map<string, boolean> {
    const tempCategories = [];
    items.map(item => {
      if (!tempCategories.includes(item.category)) {
        tempCategories.push(item.category);
      }
    });
    const tempCategoriesMap = new Map();
    tempCategories.sort().forEach(category => {
      if (categories && categories.get(category) !== undefined) {
        tempCategoriesMap.set(category, categories.get(category));
      } else {
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
