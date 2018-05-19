import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Message {
  id: number;
  text: string;
  type: string;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class MyMessageService {
  messagesSubject = new Subject<Message[]>();
  messages: Message[] = [];
  id = 0;

  constructor() {}

  get $messages() {
    return this.messagesSubject.asObservable();
  }

  addMessage(text: string, type: string, time: number = 1000) {
    this.id ++;
    this.messages.push({id: this.id, text: text, type: type, time: time});
    console.log('Message added for ' + (time / 1000).toFixed(0) + ' seconds: ' + this.id + ' | ' + text);
    this.messagesSubject.next(this.messages);
    this.deleteMessage(this.id, time);
  }

  deleteMessage(id: number, time: number) {
    setTimeout(() => {
      this.messages = this.messages.filter(message => message.id !== id);
      console.log('Delted message with id: ' + id);
      console.log(this.messages);
      this.messagesSubject.next(this.messages);
    }, time);
  }
}
