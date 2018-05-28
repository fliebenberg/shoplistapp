import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';

import { MyItemsService } from '../../services/my-items.service';
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
    public router: Router,
    public route: ActivatedRoute,
    public messageService: MyMessageService
  ) { }

  ngOnInit() {
    if (!this.itemsService.items) {
      this.router.navigate(['/items']);
    } else {
      this.item = new Item();
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
        if (this.id) {
          if (this.itemsService.getItem(this.id)) {
            this.item = this.itemsService.getItem(this.id);
          } else {
            console.log('Item id ' + this.id + 'does not exist');
            this.messageService.addMessage('Could not find item with id ' + this.id + '.', MessageType.error, 10000);
          }
        }
      });
    }
  }

}
