import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MyMaterialModule } from './../material/my-material.module';
import { UserModule } from '../user/user.module';
import { ItemsModule } from '../items/items.module';
import { ShoppingListModule } from './../shopping-list/shopping-list.module';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { NavbarComponent } from './components/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { MessageToastComponent } from './components/message-toast.component';
// import { itemsReducer } from '../items/store/items.reducer';
import { EffectsModule } from '@ngrx/effects';
// import { ItemsEffects } from '../items/store/items.effects';

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
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
    MyMaterialModule,
    FlexLayoutModule,
    UserModule,
    ItemsModule,
    ShoppingListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
