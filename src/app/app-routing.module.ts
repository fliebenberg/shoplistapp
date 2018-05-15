import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { UserLoginComponent } from './user/user-login.component';
import { ItemListComponent } from './items/item-list.component';
import { ItemAddComponent } from './items/item-add.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: UserLoginComponent},
  {path: 'signup', component: UserLoginComponent, data: {signUp: true}},
  {path: 'items', component: ItemListComponent},
  {path: 'items/add', component: ItemAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
