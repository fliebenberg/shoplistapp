import { MyUserService } from './../../../user/my-user.service';
import { UserState } from './../../../user/store/user.reducer';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MyItemsService } from '../../my-items.service';
import { Store } from '@ngrx/store';
import { ItemsState, getCategoriesMap } from './../../store/items.reducer';
import * as UserActions from './../../../user/store/user.actions';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html'
})
export class CategoriesFilterComponent implements OnInit {
  categoriesSub: Subscription;
  categoriesMap: Map<string, boolean>;
  categoriesArray: string[]; // Array of category names


  constructor(
    public itemService: MyItemsService,
    public itemsStore: Store<ItemsState>,
    public userService: MyUserService) { }

  ngOnInit() {
    this.categoriesSub = this.itemsStore.select(getCategoriesMap).subscribe(categoriesMap => {
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
    this.userService.toggleExcludeCategory(category);
  }

}
