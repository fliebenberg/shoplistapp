import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';

import { MyItemsService } from '../../services/my-items.service';
import { ItemsState } from './../store/items.reducer';
import { Store } from '@ngrx/store';
import { Item } from '../models/item.model';
import { MyMessageService, MessageType } from '../../services/my-message.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html'
})
export class ItemViewComponent implements OnInit {
  item: Item;
  id: string;

  constructor(
    public itemsService: MyItemsService,
    public store: Store<ItemsState>,
    public router: Router,
    public route: ActivatedRoute,
    public messageService: MyMessageService
  ) { }

  ngOnInit() {
    if (this.itemsService.loadingItems) {
      console.log('[ItemViewComponent] Items have not been loaded. Redirecting to ItemList.');
      this.router.navigate(['/items']);
    } else {
      this.item = new Item();
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
        if (this.id) {
          const foundItem = this.itemsService.getItem(this.id);
          console.log('[ItemViewComponent] FoundItem: ', foundItem);
          if (foundItem) {
            this.item = foundItem;
          } else {
            console.log('[ItemViewComponent] Item id ' + this.id + ' does not exist. Redirecting to ItemList.');
            this.messageService.addMessage('[ItemViewComponent] Could not find item with id ' + this.id + '.', MessageType.error, 10000);
            this.router.navigate(['/items']);
          }
        } else {
          console.log('[ItemViewComponent] Could not read id param. Redirecting to ItemList.');
          this.router.navigate(['/items']);
        }
      });
    }
  }

}
