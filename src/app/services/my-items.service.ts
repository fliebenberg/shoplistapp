import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, throwError, Subject } from 'rxjs';

import { Item } from '../items/models/item.model';
import { ItemsFilter } from '../items/models/items-filter.model';

@Injectable({
  providedIn: 'root'
})
export class MyItemsService {
  items: Item[] = [];
  $items: Observable<Item[]>;
  itemsCollection: AngularFirestoreCollection<Item>;
  categoriesMap = new Map();
  categoriesFilterCount = 0;

  filteredItems: Item[] = [];
  filteredItemsSubject = new Subject<Item[]>();
  itemsFilters = new ItemsFilter();
  itemsFiltersSubject = new Subject<ItemsFilter>();

  constructor(public afStore: AngularFirestore) {
    // needed to set this to take account of changes in firestore
    this.afStore.firestore.settings({timestampsInSnapshots: true});

    this.itemsCollection = this.afStore.collection('items');
    this.$items = this.itemsCollection.valueChanges();
    this.$items.subscribe(items => {
      this.items = items;
      this.filteredItems = this.searchItems('', items);
      this.filteredItemsSubject.next(this.filteredItems);
      this.updateCategories();
      console.log('Items loaded...');
    });
  }

  get $filteredItems(): Observable<Item[]> {
    return this.filteredItemsSubject.asObservable();
  }

  get itemsFilters$(): Observable<ItemsFilter> {
    return this.itemsFiltersSubject.asObservable();
  }

  getItem(itemId: string): Item {
    let foundItem = null;
    if (this.items) {
      foundItem = Object.assign({}, this.items.find(item => item.id === itemId));
    } else {
      console.log('Error: Items not loaded');
    }
    return foundItem;
  }

  saveItem(item: Item): Promise<any> {
    console.log('Saving Item...');
    if (!item.id || item.id.length === 0) {
      item.id = this.afStore.createId();
      console.log('New id created: ' + item.id);
    }
    return this.itemsCollection.doc(item.id).set(Object.assign({}, item));
  }

  deleteItem(itemId: string): Promise<any> {
    return this.itemsCollection.doc(itemId).delete();
  }

  searchItems(searchText: string, items: Item[]): Item[] {
    if (searchText && searchText.length > 0) {
      return Object.assign([], items).filter((item: Item) => {
        const include = item.name.toLowerCase().includes(searchText.toLowerCase());
        return include;
      });
    } else {
      return items;
    }
  }

  filterItems(filters: ItemsFilter, items: Item[]): Item[] {
    const newItems = [];
    items.filter(item => {
      let include = true;
      if (
        item.category &&
        filters.categoriesFilter.length > 0 &&
        filters.categoriesFilter.indexOf(item.category) === -1
      ) { include = true; } else { include = false; }
      if (
        include &&
        filters.searchFilter.length > 0 &&
        item.name.toLowerCase().includes(filters.searchFilter.toLowerCase())
      ) { include = true; } else { include = false; }
      return include;
    });
    return newItems;
  }

  updateCategories(): void {
    const tempCategories = [];
    this.items.map(item => {
      if (!tempCategories.includes(item.category)) {
        tempCategories.push(item.category);
      }
    });
    const tempCategoriesMap = new Map();
    tempCategories.sort().forEach(category => {
      tempCategoriesMap.set(category, true);
    });
    this.categoriesMap = tempCategoriesMap;
  }

  get categories(): string[] {
    return Array.from(this.categoriesMap.keys());
  }

  get filteredCategories(): string[] {
    const tempArray: string[] = [];
    this.categoriesMap.forEach(([key, value]) => {
      if (!value) {
        tempArray.push(key);
      }
    });
    return tempArray;
  }
}
