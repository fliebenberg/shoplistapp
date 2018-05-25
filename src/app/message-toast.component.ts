import { Component, OnInit, Input } from '@angular/core';
import { Message, MessageType } from './services/my-message.service';

@Component({
  selector: 'app-message-toast',
  templateUrl: './message-toast.component.html'
})
export class MessageToastComponent implements OnInit {
  @Input() messages: Message[];
  constructor() { }

  ngOnInit() {
  }

  msgClass(message: Message): string {
    switch(message.type) {
      case MessageType.success: {
        return ' bg-success text-white ';
      }
      case MessageType.error: {
        return ' bg-danger text-white ';
      }
      case MessageType.info: {
        return ' bg-primary text-white ';
      }
      default: {
        return ' bg-secondary text-white ';
      }
    }
  }

}
