import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../services/my-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  userEmail: string;
  userPassword: string;
  errorMsg = '';
  loginWithDifferentEmailFlag = false;
  newProviderCredential = null;
  showGoogle = true;
  showFacebook = true;
  showTwitter = true;
  showEmailPassword = true;

  constructor(public authService: MyAuthService, public router: Router) { }

  ngOnInit() {
    this.initialiseVars();
  }

  initialiseVars() {
    this.userEmail = '';
    this.userPassword = '';
    this.errorMsg = '';
    this.loginWithDifferentEmailFlag = false;
    this.newProviderCredential = null;
    this.showGoogle = true;
    this.showFacebook = true;
    this.showEmailPassword = true;
  }

  signupEmailPassword(email: string, password: string) {
    console.log('Sign up user with email and password');
    this.authService.signupEmailPassword(email, password).then(() => {
      this.errorMsg = '';
      this.router.navigate(['']);
    }).catch((error) => {
      this.handleError(error, email);
    });
  }

  loginEmailPassword(email: string, password: string) {
    console.log('Logging in user with his email and password:' + email + '|' + password);
    this.authService.loginEmailPassword(email, password).then(() => {
      this.errorMsg = '';
      if (this.newProviderCredential) {
        this.linkNewProvider();
      }
      this.router.navigate(['']);
    }).catch((error) => {
      this.handleError(error, email, password);
    });
  }

  loginGoogleUser() {
    console.log('Logging in user with Google');
    this.authService.logInGoogle().then(() => {
      this.errorMsg = '';
      console.log('Google logged in.', this.newProviderCredential);
      if (this.newProviderCredential) {
        this.linkNewProvider();
      }
      this.router.navigate(['']);
    })
    .catch((error) => {
      console.log('Google login error.');
      this.handleError(error, error.email);
    });
  }

  loginFacebookUser() {
    console.log('Logging in user with Facebook');
    this.authService.logInFacebook().then(() => {
      console.log('Facebook successful log in.');
      this.errorMsg = '';
      if (this.newProviderCredential) {
        this.linkNewProvider();
      }
      this.router.navigate(['']);
    })
    .catch((error) => {
      this.handleError(error, error.email);
    });
  }

  linkNewProvider() {
    console.log('Attempting to link new provider');
    this.authService.currentUser.linkAndRetrieveDataWithCredential(this.newProviderCredential).then(cred => {
      console.log('New provider linked succesfully');
      console.log(cred);
    }).catch(error => {
      console.log('New provider link failed.');
      this.handleError(error);
    });
  }

  handleError(error, email?: string, password?: string) {
    console.log('Error caught in handler: ' + error.code, error);
    switch (error.code) {
      case "auth/user-not-found": {
        this.errorMsg = 'Email ' + email + ' is unknown. Please "Sign Up" for a new account.';
        break;
      }
      case "auth/wrong-password": {
        if (email) {
          this.authService.afAuth.auth.fetchSignInMethodsForEmail(email).then((providers: string[]) => {
            if (providers.length > 0 && !providers.includes('password')) {
              this.errorMsg = 'An account for ' + email + ' already exist. Sign in using one of the methods below or Sign in using a different email.';
              console.log(providers);
              this.loginWithDifferentEmailFlag = true;
              this.newProviderCredential = this.authService.newEmailPasswordCredential(email, password);
              console.log('New email provider to link');
              console.log(error);
              this.checkProviders(providers);
            } else {
              this.errorMsg = 'Incorrect password.';
            }
          });
        }
        break;
      }
      case 'auth/account-exists-with-different-credential': {
        this.authService.afAuth.auth.fetchSignInMethodsForEmail(email).then((providers: string[]) => {
          if (providers.length > 0) {
            this.errorMsg = 'An account for ' + email + ' already exist. "Sign in" using one of the methods below or "Sign in with a different email".';
            this.loginWithDifferentEmailFlag = true;
            this.newProviderCredential = error.credential;
            console.log('New social provider to link');
            console.log(error);
            this.checkProviders(providers);

          }
        });
        break;
      }
      case 'auth/invalid-email': {
        this.errorMsg = 'Not a valid email.';
        break;
      }
      case 'auth/network-request-failed': {
        this.errorMsg = 'Oops! Having trouble connecting to the network.';
        break;
      }
      default: {
        console.log('Unidentified error: ' + error.code);
        this.errorMsg = 'An unidentified error has occured: ' + error.code;
      }
    }
  }

  checkProviders(providers: string[]) {
    console.log(providers);
    if (!providers.includes('google.com')) { this.showGoogle = false; }
    console.log('Show google: ' + this.showGoogle);
    if (!providers.includes('facebook.com')) { this.showFacebook = false; }
    if (!providers.includes('password')) { this.showEmailPassword = false; }
  }

  loginWithDifferentEmail() {
    this.initialiseVars();
  }
}
