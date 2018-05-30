import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, throwError, Subject } from 'rxjs';

import { Item } from './../items/item.model';
import { Store } from '@ngrx/store';
import { ItemsState } from './../items/store/items.reducer';
import * as ItemsActions from './../items/store/items.actions';

@Injectable({
  providedIn: 'root'
})
export class MyItemsService {
  items: Item[] = [];
  fbItems$: Observable<Item[]>;
  itemsCollection: AngularFirestoreCollection<Item>;

  // filteredItems: Item[] = [];
  // filteredItemsSubject = new Subject<Item[]>();
  categoriesMap = new Map();
  // filters = {
  //   searchFilter: '',
  //   categoryFilter: ['']
  // };

  constructor(public afStore: AngularFirestore, public store: Store<ItemsState>) {
    // needed to set this to take account of changes in firestore
    this.afStore.firestore.settings({timestampsInSnapshots: true});

    this.itemsCollection = this.afStore.collection('items');
    this.fbItems$ = this.itemsCollection.valueChanges();
    this.fbItems$.subscribe(items => {
      this.store.dispatch(new ItemsActions.LoadItemsSuccess(items));
      // this.items = items;
      // this.filteredItems = this.searchItems('', items);
      // this.filteredItemsSubject.next(this.filteredItems);
      // this.categoriesMap = this.updateCategories(this.items, this.categoriesMap);
      // console.log('Items loaded...');
    });
    // this.store.select('itemsState').subscribe(itemsState => {
    //   this.items = itemsState.items;
    //   this.categoriesMap = itemsState.categories;
    // })
  }

  // get $filteredItems(): Observable<Item[]> {
  //   return this.filteredItemsSubject.asObservable();
  // }

  // getItems(): Observable<Item[]> {
  //   console.log('[ItemsService] Called function getitems...');
  //   return this.fbItems$;
  // }

  getItem(itemId: string): Item {
    let foundItem = null;
    if (this.items) {
      foundItem = Object.assign({}, this.items.find(item => item.id === itemId));
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
        console.log('Added category: ' + item.category);
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
}
