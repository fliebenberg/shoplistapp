import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyAuthService {
  authState: any = null;
  $authState: Observable<any>;

  constructor(public app: FirebaseApp, public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
    this.$authState = afAuth.authState;
  }

// Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  newEmailPasswordCredential(email: string, password: string) {
    return firebase.auth.EmailAuthProvider.credential(email, password);
  }

  signupEmailPassword(email: string, password: string) {
    console.log('Registering user with email and password...');
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      credential => {
        this.authState = credential.user;
      }
    );
  }

  loginEmailPassword(email: string, password: string) {
    console.log ('Logging in with Email and Password...');
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      credential => {
        this.authState = credential.user;
      }
    );
  }

  logInGoogle() {
    console.log ("Logging in with Google...");
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialLogin(provider);
   }

   logInFacebook() {
    console.log ("Logging in with Facebook...");
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialLogin(provider);
   }

  logInTwitter() {
    console.log ("Logging in with Twitter...");
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialLogin(provider);
   }

  private socialLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(
      credential => {
        this.authState = credential.user;
      });
  }

  logOut(route?: string) {
    this.afAuth.auth.signOut().then(() => {
      if (route) { this.router.navigate([route]); }
    });
  }
}
