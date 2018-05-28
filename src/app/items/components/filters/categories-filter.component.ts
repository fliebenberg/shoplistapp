import { Component, OnInit } from '@angular/core';
import { MyItemsService } from '../../../services/my-items.service';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html'
})
export class CategoriesFilterComponent implements OnInit {

  constructor(public itemsService: MyItemsService) { }

  ngOnInit() {
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

  toggleCategory(category: string): void {
    if (this.itemsService.categoriesMap.get(category)) {
      this.itemsService.categoriesFilterCount ++;
    } else {
      this.itemsService.categoriesFilterCount --;
    }
    this.itemsService.categoriesMap.set(category, !this.itemsService.categoriesMap.get(category));
  }

}
