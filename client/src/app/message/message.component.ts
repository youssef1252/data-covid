import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../models/message';
import {tap} from 'rxjs/operators';
import {MessageService} from '../services/message/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  showMessages = false;

  errors$: Observable<string[]>;


  constructor(public messagesService: MessageService) {

      console.log("Created messages component");

  }

  ngOnInit() {
      this.errors$ = this.messagesService.errors$
          .pipe(
              tap(() => this.showMessages = true)
          );

  }


  onClose() {
      this.showMessages = false;

  }

}
