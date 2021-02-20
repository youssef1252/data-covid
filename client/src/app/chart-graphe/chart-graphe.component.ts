import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService  } from 'ngx-bootstrap/datepicker';
import {CoronaService} from '../services/corona/corona.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Corona } from '../models/corona';

@Component({
  selector: 'app-chart-graphe',
  templateUrl: './chart-graphe.component.html',
  styleUrls: ['./chart-graphe.component.css']
})
export class ChartGrapheComponent implements OnInit {

  public barChartLabels = [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [
    {data: [], label: 'Hospitalisation'},
    {data: [], label: 'Réanimation'},
    {data: [], label: 'Retour à domicile'},
    {data: [], label: 'Décès'},
  ];

  public labelData$: Observable<Corona>;

  public currentDate$: Observable<any>;

  bsConfig: Partial<BsDatepickerConfig>;

  private startDate;

  private endDate;

  public bsValue;

  ranges: any = [{
    value: [new Date(new Date().setDate(new Date().getDate() - 2)), new Date()],
    label: '24h'
  },
  {
    value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
    label: 'Dérniers 7 jours'
  },{
    value: [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()],
    label: 'Dérnier mois'
  }, {
    value: [new Date(new Date().setMonth(new Date().getMonth() - 3)), new Date()],
    label: 'Dérniers 3 mois'
  }, {
    value: [new Date(new Date().setMonth(new Date().getMonth() - 6)), new Date()],
    label: 'Dérniers 6 mois'
  }];

  public disabledButton = true; 

  constructor(
    private coronaService: CoronaService,
    private localeService: BsLocaleService
    ) {
      this.reloadData();
      this.bsConfig = Object.assign(
        {},
        {containerClass: 'theme-blue', isAnimated: true, ranges: this.ranges, adaptivePosition: true }
      );
      this.localeService.use('fr');
  }

  clear() {
    this.bsValue = null;
  }

  onDateChange(newDate: Date) {
    this.startDate = (newDate) ? this.coronaService.formatDate(new Date(newDate[0]), true) : null;
    this.endDate = (newDate) ? this.coronaService.formatDate(new Date(newDate[1]), true) : null;  
    if(this.startDate !== undefined || this.endDate !== undefined) {
      this.barChartLabels = [];
      this.barChartData[0].data = [];
      this.barChartData[1].data = [];
      this.barChartData[2].data = [];
      this.barChartData[3].data = [];
      this.coronaService.getCoronaByDate(this.startDate, this.endDate);
    } 
    this.disabledButton = (newDate === null);
  }

  private reloadData() {
    this.coronaService.corona$
    .subscribe(d => {
      d.forEach(elem => {
        let currentDate = new Date(elem['_id']);
        let dateString = this.coronaService.formatDate(currentDate);
        this.barChartLabels.push(dateString)
        this.barChartData[0].data.push(elem.hosp);
        this.barChartData[1].data.push(elem.rea);
        this.barChartData[2].data.push(elem.rad);
        this.barChartData[3].data.push(elem.dc);
      })
    });
    this.labelData$ = this.coronaService.coronaByCurrentDay$
    .pipe(
      map(response => response[0])
    );
    this.currentDate$ = this.coronaService.importedDate$
    .pipe(
      map(response => this.coronaService.formatDate(new Date(response['created_at'])))
    );
  }

  ngOnInit(): void {}

}
