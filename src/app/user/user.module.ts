import { AppRoutingModule } from './../core/app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';

import { UserComponent } from './components/user.component';
import { UserLoginComponent } from './components/user-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forFeature('userState', userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [
    UserComponent,
    UserLoginComponent,
  ]
})
export class UserModule { }
