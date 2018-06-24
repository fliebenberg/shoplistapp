import { MyAuthService } from './../core/services/my-auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { User } from './models/user.model';
import { UserState, getUserLoading } from './store/user.reducer';
import * as UserActions from './store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class MyUserService {
  usersCollection: AngularFirestoreCollection<User[]>;
  userDoc: AngularFirestoreDocument<User>;
  userLoading: boolean;

  constructor(
    private afStore: AngularFirestore,
    private store: Store<UserState>,
    // private authService: MyAuthService,
  ) {
    this.afStore.firestore.settings({timestampsInSnapshots: true});  // needed to set this to take account of changes in firestore
    this.usersCollection = this.afStore.collection('users');
  }

  createUser(userObject: any): User {
    console.log('[UserService] createUser userObject: ', userObject);
    const newUser = new User();
    if (userObject) {
      if (userObject.id) { newUser.id = userObject.id; } else {
        if (userObject.uid) { newUser.id = userObject.uid; }
      }
      if (userObject.firstName) { newUser.firstName = userObject.firstName; }
      if (userObject.lastName) { newUser.lastName = userObject.lastName; }
      if (userObject.email) { newUser.email = userObject.email; }
      if (userObject.photoUrl) { newUser.photoUrl = userObject.photoUrl; }
      // if (userObject.shoppingLists) { newUser.shoppingLists = userObject.shoppingLists; }
    }
    console.log('[UserService] createUser newUser: ', newUser);
    return newUser;
  }

  getUserDocRef(userId: string): AngularFirestoreDocument<User> {
    return this.usersCollection.doc('users/' + userId);
  }
}
