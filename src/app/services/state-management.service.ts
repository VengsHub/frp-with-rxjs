import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  // state
  private _state = ':)';
  get state(): string {
    return this._state;
  }
  set state(newState: string) {
    this._state = newState;
  }

  // rxjs
  private _stateRxjs = new BehaviorSubject<string>(':)');
  public state$: Observable<string> = this._stateRxjs.asObservable();

  changeState(newState: string): void {
    this._stateRxjs.next(newState);
  }
}
