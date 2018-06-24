import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './../core/app-routing.module';
import { EditShoppingListComponent } from './components/edit-shopping-list.component';
import { ViewShoppingListsComponent } from './components/shopping-lists.component';
import { shoppingListReducer } from './store/shopping-list.reducer';
import { ShoppingListEffects } from './store/shopping-list.effects';
import { ShoppingListViewComponent } from './components/shopping-list-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forFeature('shoppingListsState', shoppingListReducer),
    EffectsModule.forFeature([ShoppingListEffects]),
  ],
  declarations: [EditShoppingListComponent, ViewShoppingListsComponent, ShoppingListViewComponent]
})
export class ShoppingListModule { }
