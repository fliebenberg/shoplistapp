import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from '../user/user.module';
import { ItemsModule } from '../items/items.module';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { NavbarComponent } from './components/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { MessageToastComponent } from './components/message-toast.component';
import { itemsReducer } from '../items/store/items.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ItemsEffects } from '../items/store/items.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    MessageToastComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    StoreModule.forRoot({itemsState: itemsReducer}),
    EffectsModule.forRoot([ItemsEffects]),
    StoreDevtoolsModule.instrument({}),
    UserModule,
    ItemsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
