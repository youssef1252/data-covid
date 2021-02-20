import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartGrapheRoutingModule } from './chart-graphe-routing.module';
import { ChartGrapheComponent } from './chart-graphe.component';
import { ChartsModule } from 'ng2-charts';
import {MessageModule} from '../message/message.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);

@NgModule({
  declarations: [ChartGrapheComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    MessageModule,
    ChartGrapheRoutingModule,
    ChartsModule
  ],
})
export class ChartGrapheModule { }
