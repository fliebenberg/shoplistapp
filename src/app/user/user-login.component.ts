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
  showGoogle = true;
  showFacebook = true;
  showTwitter = true;
  showEmailPassword = true;

  constructor(public authService: MyAuthService, public router: Router) { }

  ngOnInit() {
    this.errorMsg = '';
  }

  loginEmailPassword(email: string, password: string) {
    console.log('Logging in user with his email and password:' + email + '|' + password);
    this.authService.loginEmailPassword(email, password).then(() => {
      this.errorMsg = '';
      // this.router.navigate(['']);
    }).catch((error) => {
      if (error.code === "auth/wrong-password") {
        console.log('Fred error');
        this.authService.afAuth.auth.fetchProvidersForEmail(email).then((providers: string[]) => {
          if (!providers.includes('google.com')) { this.showGoogle = false; }
          if (!providers.includes('facebook.com')) { this.showFacebook = false; }
          if (!providers.includes('twitter.com')) { this.showTwitter = false; }
          if (!providers.includes('twitter.com')) { this.showEmailPassword = false; }
        });
      }
      this.handleError(error, email);
    });
  }

  
  loginGoogleUser() {
    console.log("Logging in user with Google");
    this.authService.logInGoogle().then(() => {
      this.errorMsg = '';
      this.router.navigate(['']);
    })
    .catch((error) => {
      this.handleError(error);
    });
  }

  loginFacebookUser() {
    console.log("Logging in user with Facebook");
    this.authService.logInFacebook().then(() => {
      this.errorMsg = '';
      this.router.navigate(['']);
    })
    .catch((error) => {
      this.handleError(error);
    });
  }

  loginTwitterUser() {
    console.log("Logging in user with Twitter");
    this.authService.logInTwitter().then(() => {
      this.errorMsg = '';
      this.router.navigate(['']);
    })
    .catch((error) => {
      this.handleError(error);
    });
  }

  handleError(error, email?: string) {
    console.log('Error Caught: ' + error.code);
    switch (error.code) {
      case "auth/user-not-found": {
        this.errorMsg = email ? 'Email ' + email + 'is unknown. Please register.' : 'Unknown email';
        break;
      }
      case "auth/wrong-password": {
        if (email) {
          this.authService.afAuth.auth.fetchSignInMethodsForEmail(email).then((providers: string[]) => {
            if (providers.length > 0) {
              this.errorMsg = 'The email ' + email + ' already exist. You can log in with the following providers:';
              providers.forEach(provider => {
                this.errorMsg += provider + ':';
              });
            } else {
              this.errorMsg = 'Incorrect password.';
            }
          });
        }
        break;
      }
      default: {
        this.errorMsg = 'An unidentified error has occured: ' + error.code;
      }
    }
  }
}
