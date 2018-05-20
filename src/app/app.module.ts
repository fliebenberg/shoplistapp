import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user/user-login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar.component';
import { ItemListComponent } from './items/item-list.component';
import { ItemEditComponent } from './items/item-edit.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ItemViewComponent } from './items/item-view.component';
import { MessageToastComponent } from './message-toast.component';
import { ItemFiltersComponent } from './items/item-filters.component';
import { CategoriesFilterComponent } from './items/filters/categories-filter.component';
import { ProvidersFilterComponent } from './items/filters/providers-filter.component';
import { BrandsFilterComponent } from './items/filters/brands-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserComponent,
    HomeComponent,
    NavbarComponent,
    ItemListComponent,
    ItemEditComponent,
    PageNotFoundComponent,
    ItemViewComponent,
    MessageToastComponent,
    ItemFiltersComponent,
    CategoriesFilterComponent,
    ProvidersFilterComponent,
    BrandsFilterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
