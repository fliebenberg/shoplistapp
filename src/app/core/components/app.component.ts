import { MyShoppingListService } from '../../shopping-list/my-shopping-list.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../services/my-auth.service';
import { MyMessageService, Message, MessageType } from '../services/my-message.service';
import { MyItemsService } from '../../items/my-items.service';
import * as ItemsActions from '../../items/store/items.actions';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../items/store/items.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Shop List";
  messages: Message[] = [];
  // messageType = MessageType;
  // itemsState: Observable<ItemsState>;

  constructor(
    public authService: MyAuthService,
    public messageService: MyMessageService,
    public itemsService: MyItemsService,
    public slService: MyShoppingListService,
    public store: Store<ItemsState>
  ) {
    this.messageService.$messages.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  ngOnInit() {
  }
  addMessage(type: MessageType) {
    this.messageService.addMessage('Test Message', type);
  }
}
