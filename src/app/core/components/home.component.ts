import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MyAuthService } from '../services/my-auth.service';
import { Store } from '@ngrx/store';
import { UserState, getUser } from '../../user/store/user.reducer';
import { User } from './../../user/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  user: User;
  existingShoppingLists = false;

  constructor(public authService: MyAuthService, public store: Store<UserState>, public router: Router) { }

  ngOnInit() {
    this.userSub = this.store.select(getUser).subscribe(user => {
      this.user = user;
      this.existingShoppingLists = (user && user.shoppingLists && user.shoppingLists.length > 0);
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
