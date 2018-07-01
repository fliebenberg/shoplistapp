import { MyUserService } from './../my-user.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as UserActions from './user.actions';
import { UserState, getUser } from './user.reducer';

@Injectable()
export class UserEffects {
  constructor (private actions$: Actions, private userService: MyUserService, private userStore: Store<UserState>) {}

  @Effect()
  addUser$: Observable<Action> = this.actions$.pipe(
      ofType(UserActions.ADD_USER),
      switchMap((action: UserActions.AddUser) => {
          const newUser = this.userService.convertToUser(action.payload);
          return this.userService.usersCollection.doc(newUser.id).set({...newUser})
            .then(() => {
                console.log('[UserEffects] Effect AddUser Calling Action AddUserSuccess');
                return new UserActions.AddUserSuccess(newUser);
            })
            .catch((error: any) => {
              console.log('[UserEffects] Effect AddUser Calling Action AddUserFailure', error);
              return new UserActions.AddUserFailure(action.payload);
            });
      })
  );

  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.LOAD_USER),
    switchMap((action: UserActions.LoadUser) => {
      const newUser = this.userService.convertToUser(action.payload);
      return this.userService.usersCollection.doc(newUser.id).valueChanges().pipe(
        map((user: any) => {
            if (user) {
              console.log('[UserEffects] Effect LoadUser Calling Action LoadUserSuccess', action.payload);
              return new UserActions.LoadUserSuccess(this.userService.convertToUser(user));
            } else {
              console.log('[UserEffects] Effect LoadUser calling Action AddUser', action.payload);
              return new UserActions.AddUser(newUser);
            }
          }),
        catchError((error) => {
          console.log('[UserEffects] Effect LoadUser Calling Action LoadUserFailure', error, action.payload);
          return Observable.of(new UserActions.LoadUserFailure(action.payload));
        })
      );
    })
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.UPDATE_USER),
    switchMap((action: UserActions.UpdateUser) => {
      return this.userService.saveUser(action.payload)
        .then(() => {
          console.log('[UserEffects] Effect UpdateUser calling Action UpdateUserSuccess', action.payload);
          return new UserActions.UpdateUserSuccess(action.payload);
        })
        .catch((error) => {
          console.log('[UserEffects] Effect UpdateUser calling Action UpdateUserFailure', error, action.payload);
          return new UserActions.UpdateUserFailure(error);
        });
    })
  );

  @Effect()
  toggleExcludeCategory$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.TOGGLE_EXCLUDE_CATEGORY),
    map((action: UserActions.ToggleExcludeCategory) => {
      console.log('[UserEffects] Effect ToggleExcludeCategory calling Action UpdateUser', action.payload.user);
      return new UserActions.UpdateUser(action.payload.user);
    })
  );
}
