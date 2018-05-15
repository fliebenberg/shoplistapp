import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Item } from './../items/item.model';

@Injectable({
  providedIn: 'root'
})
export class MyItemsService {
  $items: Observable<any[]>;
  itemsCollection: AngularFirestoreCollection<Item>;

  constructor(public afStore: AngularFirestore) { 
    // needed to set this to take account of changes in firestore
    this.afStore.firestore.settings({timestampsInSnapshots: true});

    this.itemsCollection = this.afStore.collection('items');
    this.$items = this.itemsCollection.valueChanges();
  }

  addItem(item: Item) {
    const id = this.afStore.createId();
    item.id = id;
    this.itemsCollection.doc(id).set(item);
  }

}
