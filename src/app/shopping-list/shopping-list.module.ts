import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditShoppingListComponent } from './components/edit-shopping-list.component';
import { ViewShoppingListsComponent } from './components/view-shopping-lists.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EditShoppingListComponent, ViewShoppingListsComponent]
})
export class ShoppingListModule { }
