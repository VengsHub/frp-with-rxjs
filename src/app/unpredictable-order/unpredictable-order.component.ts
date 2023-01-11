import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatestWith, filter, interval, map, mergeWith, Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unpredictable-order',
  templateUrl: './unpredictable-order.component.html',
  styleUrls: ['./unpredictable-order.component.scss']
})
export class UnpredictableOrderComponent implements OnInit, OnDestroy {
  private readonly unsubscribe = new Subject<void>();

  friends: string[] = [];

  readonly myObservable = interval(1000).pipe(takeUntil(this.unsubscribe));
  readonly mergedObservable = this.myObservable.pipe(combineLatestWith(this.myObservable.pipe(filter(e => e % 2 !== 0))));

  constructor() {
    this.myObservable = interval(1000).pipe(takeUntil(this.unsubscribe));
  }

  ngOnInit(): void {
    this.myObservable.subscribe(e => console.log('my observable', e))
    this.mergedObservable.subscribe(e => console.log('merged', e))

    this.getUser('userID').subscribe(user => {
      if (user.birthday === new Date()) {
        this.friends.forEach(friend => {
          this.sendMessage(friend);
        })
      }
    });

    this.getFriends('userId').subscribe(friends => {
      this.friends = friends;
    });

    const notifyOnBirthday$ = this.getUser('userID').pipe(
      combineLatestWith(this.getFriends('userId')),
      map(([user, friends]) => {
        if (user.birthday === new Date()) {
          friends.forEach(friend => {
            this.sendMessage(friend);
          })
        }
      })
    );
    notifyOnBirthday$.subscribe();
  }

  getUser(userId: string) {
    return of({name: 'user1', birthday: new Date()});
  }

  getFriends(userId: string) {
    return of(['friend1', 'friend2']);
  }

  sendMessage(friend: string) {
    console.log('message to', friend);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
