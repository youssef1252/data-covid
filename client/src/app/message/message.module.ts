import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageComponent } from '../message/message.component';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    AlertModule,
  ],
  exports: [
    MessageComponent
  ]
})
export class MessageModule { }
