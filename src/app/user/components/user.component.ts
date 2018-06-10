import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './../models/user.model';
import { UserState } from '../store/user.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  userStateSub: Subscription;
  userState: UserState;
  user: User;

  constructor(public store: Store<UserState>) { }

  ngOnInit() {
    this.userStateSub = this.store.select('userState').subscribe((userState: UserState) => {
      this.userState = userState;
      this.user = userState.user;
    });

   }

   ngOnDestroy() {
     this.userStateSub.unsubscribe();
   }
}
