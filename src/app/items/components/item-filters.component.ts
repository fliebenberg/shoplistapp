import { MyItemsService } from '../my-items.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ItemsState, getCategoriesMap, getCategoriesExcludeCount } from './../store/items.reducer';

@Component({
  selector: 'app-item-filters',
  templateUrl: './item-filters.component.html'
})
export class ItemFiltersComponent implements OnInit {
  categoriesExcludeCount$: Observable<number>;

  constructor(public store: Store<ItemsState>) {}

  ngOnInit() {
    this.categoriesExcludeCount$ = this.store.select(getCategoriesExcludeCount);
  }

}
