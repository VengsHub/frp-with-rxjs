import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  private happy = true;

  private _happy = new BehaviorSubject<string>(':)');
  public $happy: Observable<string> = this._happy.asObservable();

  constructor() { }

  changeState(newState: boolean): void {
    this.happy = newState;
  }

  changeObservableState(newState: string): void {
    this._happy.next(newState);
  }
}
