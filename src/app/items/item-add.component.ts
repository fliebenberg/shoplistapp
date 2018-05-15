import { Component, OnInit } from '@angular/core';
import { MyItemsService } from '../services/my-items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html'
})
export class ItemAddComponent implements OnInit {

  constructor(public itemsService: MyItemsService, public router: Router) { }

  ngOnInit() {
  }

  addItem(name: string, category: string) {
    console.log('Adding item: ' + name + ' | ' + category);
    this.itemsService.addItem({id: '', name: name, category: category});
    this.router.navigate(['/items']);
  }

  cancel() {
    console.log('New item canceled.');
    this.router.navigate(['items']);
  }
}
