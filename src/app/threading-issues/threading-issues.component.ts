import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-threading-issues',
  templateUrl: './threading-issues.component.html',
  styleUrls: ['./threading-issues.component.scss']
})
export class ThreadingIssuesComponent implements OnInit {

  // rxjs
  private _state = new BehaviorSubject<boolean>(true);
  public state$: Observable<boolean> = this._state.asObservable();

  constructor() { }

  ngOnInit(): void {
    const subscription = this.state$.subscribe(state => console.log('state change', state));
    this._state.next(false);
    setTimeout(() => {
      subscription.unsubscribe();
      console.log('unsubscribed');
    }, 1000);
    setInterval(() => this._state.next(Math.random() > 0.5), 2000);
  }

}
