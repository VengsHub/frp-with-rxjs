import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-leaking-callbacks',
  templateUrl: './leaking-callbacks.component.html',
  styleUrls: ['./leaking-callbacks.component.scss']
})
export class LeakingCallbacksComponent implements OnInit, OnDestroy {
  myObservable: Observable<number>;

  private readonly unsubscribe = new Subject<void>();

  constructor() {
    this.myObservable = interval(1000); // .pipe(takeUntil(this.unsubscribe));
  }

  ngOnInit(): void {
    this.myObservable.subscribe(e => console.log('subscribe', e));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
