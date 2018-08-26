import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyAuthService } from '../services/my-auth.service';
import { MyMessageService, Message, MessageType } from '../services/my-message.service';
import { Store } from '@ngrx/store';
import { UIState, getShowBackButton } from '../store/ui.reducer';
import { share, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Shop List";
  messages: Message[] = [];
  backButtonStr: string;
  backButtonSub: Subscription;
  backBtn: string;

  constructor(
    public authService: MyAuthService,
    public messageService: MyMessageService,
    public route: ActivatedRoute,
    public location: Location,
    public uiStore: Store<UIState>,
  ) {
    this.messageService.$messages.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
    this.backButtonSub = this.uiStore.select(getShowBackButton).subscribe((backButtonStr: string) => {
      this.backButtonStr = backButtonStr;
    });
  }

  ngOnInit() {
  }

  addMessage(type: MessageType) {
    this.messageService.addMessage('Test Message', type);
  }

  goBack() {
    console.log('[AppComponent] Back button pressed!', this.location);
    this.location.back();
  }

  ngOnDestroy() {
    this.backButtonSub.unsubscribe();
  }
}
