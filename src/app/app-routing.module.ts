import { PageNotFoundComponent } from './page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { UserLoginComponent } from './user/user-login.component';
import { ItemListComponent } from './items/item-list.component';
import { ItemEditComponent } from './items/item-edit.component';
import { ItemViewComponent } from './items/item-view.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: UserLoginComponent},
  {path: 'signup', component: UserLoginComponent, data: {signUp: true}},
  {path: 'items', component: ItemListComponent},
  {path: 'items/add', component: ItemEditComponent},
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
