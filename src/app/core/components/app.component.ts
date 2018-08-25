import { MyParamService } from './../services/my-param.service';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MyShoppingListService } from '../../shopping-list/my-shopping-list.service';
import { Observable, of, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyAuthService } from '../services/my-auth.service';
import { MyMessageService, Message, MessageType } from '../services/my-message.service';
import { MyItemsService } from '../../items/my-items.service';
import * as ItemsActions from '../../items/store/items.actions';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../items/store/items.reducer';
import { UIState, getShowBackButton } from '../store/ui.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Shop List";
  messages: Message[] = [];
  paramSub: Subscription;
  showBackButton$: Observable<boolean>;
  backBtn: string;
  // messageType = MessageType;
  // itemsState: Observable<ItemsState>;

  constructor(
    public authService: MyAuthService,
    public messageService: MyMessageService,
    // public paramService: MyParamService,
    public route: ActivatedRoute,
    public location: Location,
    public uiStore: Store<UIState>,
    // public itemsService: MyItemsService,
    // public slService: MyShoppingListService,
    // public store: Store<ItemsState>
  ) {
    this.messageService.$messages.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
    this.showBackButton$ = this.uiStore.select(getShowBackButton);
  }

  ngOnInit() {
    // this.paramSub = this.route.paramMap.subscribe((params: ParamMap) => {
    //     console.log('[AppComponent] Checking route params: ', params);
    //     this.backBtn = params.get('back');
    // });
  }

  addMessage(type: MessageType) {
    this.messageService.addMessage('Test Message', type);
  }

  goBack() {
    console.log('[AppComponent] Need to go back!', this.location);
    this.location.back();
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }
}
