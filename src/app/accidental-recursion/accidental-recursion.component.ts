import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Component({
  selector: 'app-accidental-recursion',
  templateUrl: './accidental-recursion.component.html',
  styleUrls: ['./accidental-recursion.component.scss']
})
export class AccidentalRecursionComponent implements OnInit {

  private _state = new BehaviorSubject<string>('sunny');
  public $state: Observable<string> = this._state.asObservable();

  constructor() { }

  ngOnInit(): void {
    this.$state.pipe(take(20)).subscribe(state => {
      console.log('state update', state);
      setTimeout(() => this._state.next(state === 'sunny' ? 'rainy' : 'sunny'));
    });

    // show pipe concept, does it give an error?

    setTimeout(() => {
      this._state.next('rainy');
    }, 2000);
  }
}
