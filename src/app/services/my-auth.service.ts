import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class MyAuthService {
  authState: any = null;

  constructor(public app: FirebaseApp, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

// Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }


  logInGoogle() {
    console.log ("Logging in with Google...");
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialLogin(provider);
   }

  private socialLogin(provider) {
    this.afAuth.auth.signInWithPopup(provider).then(
      (credential) => {
        this.authState = credential.user;
      },
      (error) => {
        console.log("Could not log user in. Error message: " + error.message);
      }
    );
  }

  logOut() {
    this.afAuth.auth.signOut();
  }
}
