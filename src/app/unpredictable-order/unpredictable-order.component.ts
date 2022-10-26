import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatestWith, filter, interval, map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unpredictable-order',
  templateUrl: './unpredictable-order.component.html',
  styleUrls: ['./unpredictable-order.component.scss']
})
export class UnpredictableOrderComponent implements OnInit, OnDestroy {
  myObservable: Observable<number>;

  private readonly unsubscribe = new Subject<void>();

  constructor() {
    this.myObservable = interval(1000).pipe(takeUntil(this.unsubscribe));
  }

  ngOnInit(): void {
    this.myObservable.pipe(combineLatestWith(this.myObservable.pipe(filter(e => e % 2 !== 0)))).subscribe(e => console.log('merge', e));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
