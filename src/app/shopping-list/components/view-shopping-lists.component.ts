import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ShoppingListsState, getSLArray } from './../store/shopping-list.reducer';
import { ShoppingList } from './../models/shopping-list.model';

@Component({
  selector: 'app-view-shopping-lists',
  templateUrl: './view-shopping-lists.component.html',
})
export class ViewShoppingListsComponent implements OnInit {
  shoppingLists$: Observable<ShoppingList[]>;

  constructor(public store: Store<ShoppingListsState>, public router: Router) { }

  ngOnInit() {
    this.shoppingLists$ = this.store.select(getSLArray);
  }

  newShoppingList() {
    this.router.navigate(['/list/add']);
  }
}
