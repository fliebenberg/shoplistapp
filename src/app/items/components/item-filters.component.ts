import { MyItemsService } from './../../services/my-items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-filters',
  templateUrl: './item-filters.component.html'
})
export class ItemFiltersComponent implements OnInit {

  constructor(public itemsService: MyItemsService) { }

  ngOnInit() {
  }

}
