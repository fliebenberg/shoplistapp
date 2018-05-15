import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { MyItemsService } from '../services/my-items.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {
  items: any[];
  $items: Observable<any[]>;
  itemsSub: Subscription;

  constructor(public itemsService: MyItemsService, public router: Router) {

  }

  ngOnInit() {
    // this.itemsSub = this.itemsService.$items.subscribe(items => {
    //   this.items = items;
    // });
    this.$items = this.itemsService.$items;
  }

  addItem() {
    this.router.navigate(['/items/add']);
  }

  ngOnDestroy() {
    // this.itemsSub.unsubscribe();
  }
}
