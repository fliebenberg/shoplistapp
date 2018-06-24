import { getSLArray } from './../../shopping-list/store/shopping-list.reducer';
import { ShoppingList } from './../../shopping-list/models/shopping-list.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MyAuthService } from '../services/my-auth.service';
import { Store } from '@ngrx/store';
import { UserState, getUser } from '../../user/store/user.reducer';
import { User } from './../../user/models/user.model';
import { ShoppingListsState } from '../../shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  slSub: Subscription;
  user: User;
  existingShoppingLists = false;

  constructor(
    public authService: MyAuthService,
    public userStore: Store<UserState>,
    public slStore: Store<ShoppingListsState>,
    public router: Router) { }

  ngOnInit() {
    this.userSub = this.userStore.select(getUser).subscribe(user => {
      this.user = user;
      // this.existingShoppingLists = (user && user.shoppingLists && user.shoppingLists.length > 0);
    });
    this.slSub = this.slStore.select(getSLArray).subscribe((slArray: ShoppingList[]) => {
      this.existingShoppingLists = (slArray.length > 0);
    });
  }

  logoutUser() {
    this.authService.logOut('login');
    // this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
