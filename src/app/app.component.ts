import { Component } from '@angular/core';
import { MyAuthService } from './services/my-auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Fred's ShopList App";

  constructor(public authService: MyAuthService) {
  }

  loginUser() {
    console.log("Logging in user with Google");
    this.authService.logInGoogle();
  }

  signupUser() {

  }

  logoutUser() {
    this.authService.logOut();
  }
}
