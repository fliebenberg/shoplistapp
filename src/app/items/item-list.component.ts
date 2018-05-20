import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from './item.model';
import { MyItemsService } from '../services/my-items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[];
  $items: Observable<Item[]>;
  itemsSub: Subscription;

  constructor(public itemsService: MyItemsService, public router: Router) {

  }

  ngOnInit() {
    if ( this.itemsService.filteredItems ) { this.items = this.itemsService.filteredItems; }
    this.itemsSub = this.itemsService.$filteredItems.subscribe(items => {
      this.items = items;
    });
    // this.$items = this.itemsService.$items;
  }

  addItem() {
    this.router.navigate(['/items/add']);
  }

  applyFilter(searchText: string) {
    this.itemsService.filteredItemsSubject.next(this.itemsService.searchItems(searchText, this.itemsService.items));
  }
  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
