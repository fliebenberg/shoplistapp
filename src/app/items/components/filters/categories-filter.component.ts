import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MyItemsService } from '../../../services/my-items.service';
import { Store } from '@ngrx/store';
import { ItemsState, getCategoriesMap } from './../../store/items.reducer';
import * as ItemsActions from './../../store/items.actions';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html'
})
export class CategoriesFilterComponent implements OnInit {
  categoriesSub: Subscription;
  categoriesMap: Map<string, boolean>;
  categoriesArray: string[]; // Array of category names


  constructor(public itemService: MyItemsService, public store: Store<ItemsState>) { }

  ngOnInit() {
    this.categoriesSub = this.store.select(getCategoriesMap).subscribe(categoriesMap => {
      this.categoriesMap = categoriesMap;
      this.categoriesArray = Array.from(this.categoriesMap.keys());
    });
  }

  searchCategories(searchText: string, categories: string[]): string[] {
    if (searchText && searchText.length > 0) {
      return Object.assign([], categories).filter((category: string) => {
        const include = category.toLowerCase().includes(searchText.toLowerCase());
        return include;
      });
    } else {
      return categories;
    }
  }

  toggleCategory(category: string) {
    this.store.dispatch(new ItemsActions.ToggleCategoryInclude(category));
  }

}
