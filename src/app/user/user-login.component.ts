import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../services/my-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(public authService: MyAuthService, public router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    console.log("Logging in user with Google");
    this.authService.logInGoogle();
    this.router.navigate(['']);
  }


}
