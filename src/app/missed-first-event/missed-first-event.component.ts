import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatestWith,
  interval,
  Observable, shareReplay,
  Subject,
  takeUntil
} from 'rxjs';

@Component({
  selector: 'app-missed-first-event',
  templateUrl: './missed-first-event.component.html',
  styleUrls: ['./missed-first-event.component.scss']
})
export class MissedFirstEventComponent implements OnInit, OnDestroy {
  myObservable: Observable<number>;
  myObservable2: Observable<number>;

  private readonly unsubscribe = new Subject<void>();

  constructor() {
    this.myObservable = interval(1000).pipe(takeUntil(this.unsubscribe));
    this.myObservable2 = interval(2000).pipe(shareReplay(1), takeUntil(this.unsubscribe));
    // .share() resets observable when there are no subscribers left
  }

  // streams müssen vor UI-Initialisierung stehen

  ngOnInit(): void {
    this.myObservable.pipe(combineLatestWith(this.myObservable2)).subscribe(e => console.log('merge', e));
    setTimeout(() =>
        this.myObservable.pipe(combineLatestWith(this.myObservable2)).subscribe(e => console.log('merge after 2s', e)),
      4000);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
