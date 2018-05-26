import { Component } from '@angular/core';
import { MyAuthService } from '../../services/my-auth.service';
import { MyMessageService, Message, MessageType } from '../../services/my-message.service';
import { MyItemsService } from '../../services/my-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Shop List";
  messages: Message[] = [];
  messageType = MessageType;

  constructor(
    public authService: MyAuthService,
    public messageService: MyMessageService,
    public itemsService: MyItemsService
  ) {
    this.messageService.$messages.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  addMessage(type: MessageType) {
    this.messageService.addMessage('Test Message', type);
  }
}
