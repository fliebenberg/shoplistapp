import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../../services/my-auth.service';
import { MyMessageService, Message, MessageType } from '../../services/my-message.service';
import { MyItemsService } from '../../services/my-items.service';
import * as ItemsActions from '../../items/actions/items.actions';
import { Store } from '@ngrx/store';
import { State } from '../../items/reducers/items.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Shop List";
  messages: Message[] = [];
  messageType = MessageType;
  itemsState: Observable<State>;

  constructor(
    public authService: MyAuthService,
    public messageService: MyMessageService,
    public itemsService: MyItemsService,
    public store: Store<State>
  ) {
    this.messageService.$messages.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  ngOnInit() {
    console.log('[AppComponent] LoadItems to be called...', this.store);
    this.store.dispatch(new ItemsActions.LoadItems());
    console.log('[App Component] LoadItems have been called...', this.store);
    this.itemsState = this.store.select('itemsState');
    // console.log('[AppComponent] Loading: Value of loading: ' + this.loading.subscribe(tSTring => tSTring.toString()));
  }
  addMessage(type: MessageType) {
    this.messageService.addMessage('Test Message', type);
  }
}
