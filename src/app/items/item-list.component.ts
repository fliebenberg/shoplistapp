import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { MyItemsService } from '../services/my-items.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {
  items: any[];
  $items: Observable<any[]>;

  constructor(public itemsService: MyItemsService, public afStore: AngularFirestore) {

  }

  ngOnInit() {
    this.itemsService.$items.subscribe(items => {
      this.items = items;
    });
    this.$items = this.itemsService.$items;
  }
}
