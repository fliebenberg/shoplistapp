import { getCategoriesExcludeCount } from './../store/items.reducer';
import { ItemsState } from '../store/items.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../models/item.model';
import { MyItemsService } from '../my-items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit, OnDestroy {
  loading: boolean;
  items: Item[];
  categories: Map<string, boolean>;
  filteredItems: Item[];
  $itemsState: Observable<ItemsState>;
  itemsSub: Subscription;
  categoriesExcludeCount$: Observable<number>;


  constructor(public itemsService: MyItemsService, public router: Router, public store: Store<ItemsState>) {

  }

  ngOnInit() {
    this.$itemsState = this.store.select('itemsState');
    this.categoriesExcludeCount$ = this.store.select(getCategoriesExcludeCount);
    // if ( this.itemsService.filteredItems ) { this.items = this.itemsService.filteredItems; }
    this.itemsSub = this.$itemsState.subscribe(state => {
      this.items = state.items;
      this.categories = state.categories;
      this.applyFilter('');
      this.loading = state.loading;
    });
    // this.$items = this.itemsService.$items;
  }

  addItem() {
    this.router.navigate(['/items/add']);
  }

  applyFilter(searchText: string) {
    this.filteredItems = this.itemsService.filterItems(this.items, searchText, this.categories);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
