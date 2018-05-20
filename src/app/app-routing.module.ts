import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home.component';
import { UserLoginComponent } from './user/user-login.component';
import { ItemListComponent } from './items/item-list.component';
import { ItemEditComponent } from './items/item-edit.component';
import { ItemViewComponent } from './items/item-view.component';
import { UserComponent } from './user/user.component';
import { ItemFiltersComponent } from './items/item-filters.component';
import { CategoriesFilterComponent } from './items/filters/categories-filter.component';
import { ProvidersFilterComponent } from './items/filters/providers-filter.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: UserLoginComponent},
  {path: 'signup', component: UserLoginComponent, data: {signUp: true}},
  {path: 'user', component: UserComponent},
  {path: 'items', component: ItemListComponent},
  {path: 'items/add', component: ItemEditComponent},
  {path: 'items/filters', component: ItemFiltersComponent,
    children: [
      {path: '', redirectTo: 'categories', pathMatch: 'full'},
      {path: 'categories', component: CategoriesFilterComponent},
      {path: 'providers', component: ProvidersFilterComponent}
    ]
  },
  {path: 'item/:id', component: ItemViewComponent},
  {path: 'item/:id/edit', component: ItemEditComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
