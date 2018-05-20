import { Component, OnInit } from '@angular/core';
import { MyItemsService } from '../../services/my-items.service';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html'
})
export class CategoriesFilterComponent implements OnInit {

  constructor(public itemService: MyItemsService) { }

  ngOnInit() {
  }

}
