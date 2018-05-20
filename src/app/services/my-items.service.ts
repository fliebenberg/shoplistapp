import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, throwError } from 'rxjs';

import { Item } from './../items/item.model';

@Injectable({
  providedIn: 'root'
})
export class MyItemsService {
  items: Item[];
  $items: Observable<any[]>;
  itemsCollection: AngularFirestoreCollection<Item>;

  constructor(public afStore: AngularFirestore) { 
    // needed to set this to take account of changes in firestore
    this.afStore.firestore.settings({timestampsInSnapshots: true});

    this.itemsCollection = this.afStore.collection('items');
    this.$items = this.itemsCollection.valueChanges();
    this.$items.subscribe(items => {
      this.items = items;
      console.log('Items loaded...');
    });
  }

  // get itemsLoaded(): boolean {
  //   if (this.items) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // addItem(item: Item) {
  //   const id = this.afStore.createId();
  //   item.id = id;
  //   this.itemsCollection.doc(id).set(item);
  // }

  getItem(itemId: string): Item {
    let foundItem = null;
    if (this.items) {
      foundItem = Object.assign({},this.items.find(item => item.id === itemId));
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

}
