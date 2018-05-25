import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MyAuthService } from './services/my-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  @Input() title: string;

  constructor(public authService: MyAuthService) { }

  ngOnInit() {
  }
}
