import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyItemsService {
  $items: Observable<any[]>;
  items = [];

  constructor(public afStore: AngularFirestore) { 
    // needed to set this to take account of changes in firestore
    this.afStore.firestore.settings({timestampsInSnapshots: true});

    this.$items = this.afStore.collection('items').valueChanges();
    console.log('Hello MyItemsService');
  }

}
