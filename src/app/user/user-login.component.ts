import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../services/my-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html'
})
export class UserLoginComponent implements OnInit {
  userEmail: string;
  userPassword: string;
  errorMsg = '';
  loginWithDifferentEmailFlag = false;
  newProviderCredential = null;
  signUp = false;
  showNameInput = false;
  showGoogle = true;
  showFacebook = true;
  showEmailPassword = true;

  constructor(public authService: MyAuthService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {signUp: boolean}) => {
      this.signUp = data.signUp;
    });
    this.initialiseVars();
    if (this.route.snapshot.params['email']) {
      this.userEmail = this.route.snapshot.params['email'];
      this.authService.afAuth.auth.fetchSignInMethodsForEmail(this.userEmail).then((providers: string[]) => {
        if (providers.length > 0) {
          this.checkProviders(providers);
        }
      });
    }
    if (this.route.snapshot.params['errorMsg']) {
      this.errorMsg = this.route.snapshot.params['errorMsg'];
    }
  }

  initialiseVars() {
    this.userEmail = '';
    this.userPassword = '';
    this.errorMsg = '';
    this.loginWithDifferentEmailFlag = false;
    this.newProviderCredential = null;
    this.showNameInput = false;
    this.showGoogle = true;
    this.showFacebook = true;
    this.showEmailPassword = true;
  }

  signupUser() {
    this.showNameInput = true;
  }

  signupEmailPassword(name: string, email: string, password: string) {
    console.log('Signing up new user with email and password');
    this.authService.signupEmailPassword(email, password).then(() => {
      this.errorMsg = '';
      this.authService.currentUser.updateProfile({displayName: name}).then(() => {
        console.log('Successfully set user displayname to ' + this.authService.currentUser.displayName);
      }).catch((error) => {
        console.log('Error: Could not set user displayName', error);
      });
      this.router.navigate(['/']);
    }).catch(error => {
      console.log('Error: ' + error.code, error);
      this.handleError(error, email, password);
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
    this.authService.logInGoogle().then((userCredential) => {
      console.log('Google successful log in.');
      console.log('PhotoURL before:' + this.authService.currentUser.photoUrl);
      this.authService.currentUser.photoUrl = userCredential.additionalUserInfo.profile.picture;
      console.log('PhotoURL after:' + this.authService.currentUser.photoUrl);
      console.log(userCredential);
      console.log(this.authService.currentUser.providerData);
      this.errorMsg = '';
      console.log('Google logged in.', this.newProviderCredential);
      if (this.newProviderCredential) {
        this.linkNewProvider();
      }
      this.router.navigate(['/']);
    })
    .catch((error) => {
      console.log('Google login error.');
      this.handleError(error, error.email);
    });
  }

  loginFacebookUser() {
    console.log('Logging in user with Facebook');
    this.authService.logInFacebook().then((userCredential) => {
      console.log('Facebook successful log in.');
      console.log('PhotoURL before:' + this.authService.currentUser.photoUrl);
      this.authService.currentUser.providerData.forEach(provider => {
        console.log('Provider: ', provider);
        if (provider.providerId === 'facebook.com') {
          console.log('Found facebook');
          this.authService.currentUser.photoUrl = provider.photoURL;
        }
      });
      console.log('PhotoURL after:' + this.authService.currentUser.photoUrl);
      console.log(userCredential);
      console.log(this.authService.currentUser.providerData);
      this.errorMsg = '';
      if (this.newProviderCredential) {
        this.linkNewProvider();
      }
      this.router.navigate(['/']);
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
      case 'auth/email-already-in-use': {
        if (email) {
          this.authService.afAuth.auth.fetchSignInMethodsForEmail(email).then((providers: string[]) => {
            if (providers.length > 0) {
              this.errorMsg = 'The email ' + email + ' is already in use. You can Sign in using one of the methods below or "Sign Up" using a different email.';
              this.router.navigate(['login', {email: email, errorMsg: this.errorMsg}]);
            };
          });
        }
        break;
      }
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
    // this.errorMsg = this.sanitizer.bypassSecurityTrustHtml(this.errorMsg).toString();
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
