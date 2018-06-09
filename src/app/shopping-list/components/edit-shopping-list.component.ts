import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app';
import { MyShoppingListService } from '../my-shopping-list.service';
import { MyMessageService, MessageType } from '../../core/services/my-message.service';
import { ShoppingList } from './../models/shopping-list.model';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html'
})
export class EditShoppingListComponent implements OnInit {
  shoppingList: ShoppingList;
  editMode = false;

  constructor(
    public slService: MyShoppingListService,
    public messageService: MyMessageService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.slService.slLoading) {
      console.log('[EditSLComponent] Shopping Lists have not been loaded. Redirecting to Shopping List View.');
      this.router.navigate(['/lists']);
    } else {
      this.shoppingList = new ShoppingList();
      console.log('New shopping list created.', this.shoppingList);
      this.route.paramMap.subscribe(params => {
        const paramId = params.get('id');
        if (paramId) {
          const foundSL = this.slService.getShoppingList(paramId);
          console.log('[EditSLComponent] Found Shopping List: ', foundSL);
          if (foundSL) {
            this.shoppingList = foundSL;
            this.editMode = true;
          } else {
            console.log('[EditSLComponent] Shopping List id ' + paramId + ' does not exist. Redirecting to Shopping List View.');
            this.messageService.addMessage('[EditSLComponent] Could not find shopping list with id ' + paramId + '.', MessageType.error, 10000);
            this.router.navigate(['/lists']);
          }
        }
      });
    }
  }

  saveList() {
    if (this.shoppingList.name === '') {
      this.shoppingList.name = this.slService.formatDate(this.shoppingList.dateCreated);
    }
    this.slService.saveShoppingList(this.shoppingList);
  }

  deleteList() {
    this.slService.deleteShoppingList(this.shoppingList);
    this.router.navigate(['/lists']);
  }

}
