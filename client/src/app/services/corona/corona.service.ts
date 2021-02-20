import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Corona} from '../../models/corona';
import {MessageService} from '../message/message.service';
import {LoadingService} from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  private subjectCorona = new BehaviorSubject<Corona[]>([]);
  corona$: Observable<Corona[]> = this.subjectCorona.asObservable();

  private subjectCoronaByCurrentDay = new BehaviorSubject<Corona[]>([]);
  coronaByCurrentDay$: Observable<Corona[]> = this.subjectCoronaByCurrentDay.asObservable();

  private subjectImportedDate = new BehaviorSubject<any>('');
  importedDate$: Observable<Corona[]> = this.subjectImportedDate.asObservable();

  private params = [];
  private started;
  private ended;

  constructor(
    private http: HttpClient,
    private messages: MessageService,
    private loading: LoadingService
  ) 
  {
    this.getImportedDate();
    this.loadDataCorona();
    this.loadCoronaByCurrentDate();
  }

  getCoronaByDate(startDate=null, endDate=null) {
    this.loadDataCorona(startDate, endDate);
  }

  private loadDataCorona(startDt = null, endDt = null) {
    this.params = [];
    if(startDt !== null) {
      this.params.push(`startDate=${startDt}`)
      this.started = `startDate=${startDt}`;
    } else if(this.params.indexOf(this.started) > -1) {
      this.params.splice(this.started, 1);
    }
    if(endDt !== null) {
      this.params.push(`endDate=${endDt}`)
      this.ended = `endDate=${endDt}`;
    } else if(this.params.indexOf(this.ended) > -1) {
      this.params.splice(this.ended, 1);
    }
    let parametrs = `?${this.params.join('&')}`;
    const loadData$ = this.http.get<Corona[]>('http://localhost:3000/api/corona/france' + parametrs)
      .pipe(
        catchError(err => {
          const message = "Could not load Data";
          this.messages.showErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
        tap(data => this.subjectCorona.next(data))
      );
      this.loading.showLoaderUntilCompleted(loadData$).subscribe();
  }

  private loadCoronaByCurrentDate() {
    this.importedDate$.subscribe(response => {
      if (response) {
        let currentDate = this.formatDate(new Date(response['created_at']), true);
      const loadDataByCurrentDate$ = this.http.get<Corona[]>('http://localhost:3000/api/corona/france/?startDate='+currentDate)
      .pipe(
        catchError(err => {
          const message = "Could not load Data";
          this.messages.showErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
        tap(data => this.subjectCoronaByCurrentDay.next(data))
      );
      this.loading.showLoaderUntilCompleted(loadDataByCurrentDate$).subscribe();
      }
    });
    
  }

  private getImportedDate() {
    const loadImportedDate$ = this.http.get<any>('http://localhost:3000/api/corona/importDate')
    .pipe(
      catchError(err => {
        const message = "Could not load Data";
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(data => this.subjectImportedDate.next(data))
    );
    this.loading.showLoaderUntilCompleted(loadImportedDate$).subscribe();
  }

  public formatDate(currentDate, display = false) {
    let d = currentDate.getDate();
    let m = currentDate.getMonth() + 1;
    let y = currentDate.getFullYear();
    return display ? 
    y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) : 
    (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
  }
}
