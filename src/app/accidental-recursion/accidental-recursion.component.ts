import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Component({
  selector: 'app-accidental-recursion',
  templateUrl: './accidental-recursion.component.html',
  styleUrls: ['./accidental-recursion.component.scss']
})
export class AccidentalRecursionComponent implements OnInit {

  private _state = new BehaviorSubject<number>(1);
  public $state: Observable<number> = this._state.asObservable();

  constructor() { }

  ngOnInit(): void {
    this.$state.subscribe(state => {
      if (state % 2 === 0) {
        this._state.next(2 * state);
      }
    });

    setTimeout(() => {this._state.next(4)}, 1000);
  }
}
