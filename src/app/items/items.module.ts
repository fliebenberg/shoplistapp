import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ItemEditComponent } from './components/item-edit.component';
import { ItemFiltersComponent } from './components/item-filters.component';
import { ItemListComponent } from './components/item-list.component';
import { ItemViewComponent } from './components/item-view.component';
import { BrandsFilterComponent } from './components/filters/brands-filter.component';
import { CategoriesFilterComponent } from './components/filters/categories-filter.component';
import { ProvidersFilterComponent } from './components/filters/providers-filter.component';
import { AppRoutingModule } from '../core/app-routing.module';
import { itemsReducer } from './store/items.reducer';
import { ItemsEffects } from './store/items.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forFeature('itemsState', itemsReducer),
    EffectsModule.forFeature([ItemsEffects]),
  ],
  declarations: [
    ItemEditComponent,
    ItemFiltersComponent,
    ItemListComponent,
    ItemViewComponent,
    BrandsFilterComponent,
    CategoriesFilterComponent,
    ProvidersFilterComponent
  ]
})
export class ItemsModule { }
