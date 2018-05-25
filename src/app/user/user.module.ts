import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserComponent } from './components/user.component';
import { UserLoginComponent } from './components/user-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    UserComponent,
    UserLoginComponent,
  ]
})
export class UserModule { }
