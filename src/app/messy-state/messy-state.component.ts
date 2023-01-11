import { Component, OnInit } from '@angular/core';
import { StateManagementService } from '../services/state-management.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-messy-state',
  templateUrl: './messy-state.component.html',
  styleUrls: ['./messy-state.component.scss']
})
export class MessyStateComponent implements OnInit {
  constructor(public readonly stateManagementService: StateManagementService) { }

  public readonly anotherState = 'happy' + this.stateManagementService.state;

  public readonly derivedValue = this.stateManagementService.state$.pipe(
    map(state => state.concat('(:'))
  );

  ngOnInit(): void {
  }
}
