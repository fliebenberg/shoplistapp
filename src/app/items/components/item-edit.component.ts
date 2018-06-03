import { Component, OnInit } from '@angular/core';
import { MyItemsService } from '../../services/my-items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyMessageService, MessageType } from './../../services/my-message.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html'
})
export class ItemEditComponent implements OnInit {
  item: Item;
  id: string;
  editMode = false;

  constructor(
    public itemsService: MyItemsService,
    public router: Router,
    public route: ActivatedRoute,
    public messageService: MyMessageService,
  ) { }

  ngOnInit() {
    if (this.itemsService.loadingItems) {
      console.log('[ItemEditComponent] Items have not been loaded. Redirecting to ItemList.');
      this.router.navigate(['/items']);
    } else {
      this.item = new Item();
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
        if (this.id) {
          const foundItem = this.itemsService.getItem(this.id);
          console.log('[ItemEditComponent] FoundItem: ', foundItem);
          if (foundItem) {
            this.item = foundItem;
            this.editMode = true;
          } else {
            console.log('[ItemEditComponent] Item id ' + this.id + ' does not exist. Redirecting to ItemList.');
            this.messageService.addMessage('[ItemViewComponent] Could not find item with id ' + this.id + '.', MessageType.error, 10000);
            this.router.navigate(['/items']);
          }
        // } else {
        //   console.log('[ItemViewComponent] Could not read id param. Redirecting to ItemList.');
        //   this.router.navigate(['/items']);
        }
      });
    }
  }

  // addItem(name: string, category: string) {
  //   console.log('Adding item: ' + name + ' | ' + category);
  //   this.itemsService.addItem({id: '', name: name, category: category});
  //   this.router.navigate(['/items']);
  // }

  saveItem() {
      this.itemsService.saveItem(this.item).then(() => {
        console.log('Item saved succesfully.');
        this.messageService.addMessage('Item saved successfully.', MessageType.success);
        this.router.navigate(['/items']);
      }).catch(error => {
        console.log('Error saving item.', error);
        this.messageService.addMessage('ERROR: Could not save item.', MessageType.error);
      });
  }

  deleteItem() {
    this.itemsService.deleteItem(this.item.id).then(() => {
      console.log('[ItemEditComponent] Item deleted succesfully.');
      this.messageService.addMessage('Item deleted successfully.', MessageType.info);
      this.router.navigate(['/items']);
    }).catch(error => {
      console.log('[ItemEditComponent] Error deleting item: ', error);
      this.messageService.addMessage('ERROR: Could not delete item.', MessageType.error);
    });
  }

  cancel() {
    console.log('[ItemEditComponent] New item canceled.');
    this.messageService.addMessage('Changes not saved.', MessageType.info);
    this.router.navigate(['items']);
  }
}
