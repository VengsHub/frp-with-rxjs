import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  // state
  private _happy2 = ':)';
  get happy2(): string {
    return this._happy2;
  }
  set happy2(newHappy2: string) {
    this._happy2 = newHappy2;
  }

  // rxjs
  private _happy = new BehaviorSubject<string>(':)');
  public happy$: Observable<string> = this._happy.asObservable();

  constructor() { }

  changeState(newState: string): void {
    this._happy.next(newState);
  }
}
