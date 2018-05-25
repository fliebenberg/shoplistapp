import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home.component';
import { UserLoginComponent } from './user/components/user-login.component';
import { ItemListComponent } from './items/components/item-list.component';
import { ItemEditComponent } from './items/components/item-edit.component';
import { ItemViewComponent } from './items/components/item-view.component';
import { UserComponent } from './user/components/user.component';
import { ItemFiltersComponent } from './items/components/item-filters.component';
import { CategoriesFilterComponent } from './items/components/filters/categories-filter.component';
import { ProvidersFilterComponent } from './items/components/filters/providers-filter.component';

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
