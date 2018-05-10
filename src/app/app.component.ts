import { Component } from '@angular/core';
import { MyAuthService } from './services/my-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Shop List";

  constructor(public authService: MyAuthService) {
  }

}
