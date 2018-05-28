import { Component, OnInit } from '@angular/core';
import { MyItemsService } from '../../services/my-items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html'
})
export class ItemEditComponent implements OnInit {
  item: Item;
  id: string;
  editMode = false;

  constructor(public itemsService: MyItemsService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.itemsService.items) {
      this.router.navigate(['/items']);
    } else {
      this.item = new Item();
      console.log('Empty item assigned');
      console.log(this.route.snapshot);
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
        if (this.id) {
          if (this.itemsService.getItem(this.id)) {
            this.item = this.itemsService.getItem(this.id);
            this.editMode = true;
          } else {
            console.log('Item id ' + this.id + 'does not exist');
          }
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
        this.router.navigate(['/items']);
      }).catch(error => {
        console.log('Error saving item.', error);
      });
  }

  deleteItem() {
    this.itemsService.deleteItem(this.item.id).then(() => {
      console.log('Item deleted succesfully.');
      this.router.navigate(['/items']);
    }).catch(error => {
      console.log('Error deleting item: ', error);
    });
  }

  cancel() {
    console.log('New item canceled.');
    this.router.navigate(['items']);
  }
}
