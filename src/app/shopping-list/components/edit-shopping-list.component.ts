import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { MyMessageService, MessageType } from '../../core/services/my-message.service';
import { Item } from './../../items/models/item.model';
import { MyAuthService } from './../../core/services/my-auth.service';
// import { firestore } from 'firebase/app';
import { ShoppingList, SLIST, QLIST } from './../models/shopping-list.model';
import { MyShoppingListService } from '../my-shopping-list.service';
import { ShoppingListsState, getCurrentSL } from '../store/shopping-list.reducer';
import * as slActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html'
})
export class EditShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: ShoppingList;
  routeSub: Subscription;
  listType: string = SLIST;
  currentSLSub: Subscription;

  constructor(
    public authService: MyAuthService,
    public slService: MyShoppingListService,
    public messageService: MyMessageService,
    public slStore: Store<ShoppingListsState>,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!this.authService.currentUser || this.slService.slLoading) {
      console.log('[EditSLComponent] Shopping Lists have not been loaded. Redirecting to Shopping List View.');
      this.router.navigate(['/slists']);
    } else {
      // console.log('[EditSLComponent] Starting to search for id. SLLoading: ', this.slService.slLoading);
      this.routeSub = combineLatest(this.route.url, this.route.paramMap).subscribe(([url, params]) => {
        if (url[0].path === 'qlist') { this.listType = QLIST; } else { this.listType = SLIST; }
        const paramId = params.get('id');
        if (paramId) {
          const foundSL = this.slService.getShoppingList(paramId);
          // console.log('[EditSLComponent] Found Shopping List: ', foundSL);
          if (foundSL) {
            this.shoppingList = foundSL;
            // this.editMode = true;
          } else {
            console.log('[EditSLComponent] Shopping List id ' + paramId + ' does not exist. Redirecting to Shopping List View.');
            this.messageService.addMessage('[EditSLComponent] Could not find shopping list with id ' + paramId + '.', MessageType.error, 10000);
            this.router.navigate([this.listType + 's']);
          }
        } else {
          console.log('No parameter id found.', paramId);
        }
      });
      this.slStore.dispatch(new slActions.SetCurrentShoppingList(this.shoppingList));
      this.currentSLSub = this.slStore.select(getCurrentSL).subscribe(currentSL => {
        this.shoppingList = currentSL;
      });
    }
  }

  saveList() {
    this.slStore.dispatch(new slActions.UpdateShoppingList(this.shoppingList.id));
  }

  deleteList() {
    this.slStore.dispatch(new slActions.DeleteShoppingList(this.shoppingList));
    this.router.navigate([this.listType + 's']);
  }

  addItem() {
    console.log('[EditSLComponent] AddItem function called');
    this.router.navigate([this.listType, this.shoppingList.id, 'additem', {'back': ''}]);
  }

  increaseItem(item: Item) {
    this.slStore.dispatch(new slActions.IncreaseSLItem({item: item, SL: this.shoppingList.id}));
  }

  decreaseItem(item: Item) {
    this.slStore.dispatch(new slActions.DecreaseSLItem({item: item, SL: this.shoppingList.id}));
  }

  ngOnDestroy() {
    if (this.routeSub) { this.routeSub.unsubscribe(); }
    if (this.currentSLSub) { this.currentSLSub.unsubscribe(); }
  }
}
