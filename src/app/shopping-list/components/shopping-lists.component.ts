import { MyShoppingListService } from '../my-shopping-list.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ShoppingListsState, getSLArray } from '../store/shopping-list.reducer';
import { ShoppingList } from '../models/shopping-list.model';
import * as slActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
})
export class ViewShoppingListsComponent implements OnInit {
  shoppingLists$: Observable<ShoppingList[]>;

  constructor(public slStore: Store<ShoppingListsState>, public router: Router, public slService: MyShoppingListService) { }

  ngOnInit() {
    this.shoppingLists$ = this.slStore.select(getSLArray);
  }

  newShoppingList() {
    // const newSL = this.slService.createNewSL();
    // this.slStore.dispatch(new slActions.AddShoppingList(newSL));
    this.router.navigate(['/list/add']);
  }
}
