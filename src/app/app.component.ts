import { Component } from '@angular/core';
import { MyAuthService } from './services/my-auth.service';
import { MyMessageService, Message } from './services/my-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Shop List";
  messages: Message[] = [];

  constructor(public authService: MyAuthService, public messageService: MyMessageService) {
    this.messageService.$messages.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  addMessage() {
    this.messageService.addMessage('Test Message', 'success', 10000);
  }
}
