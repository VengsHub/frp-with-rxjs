import { Component, OnInit } from '@angular/core';
import { StateManagementService } from '../services/state-management.service';

@Component({
  selector: 'app-messy-state',
  templateUrl: './messy-state.component.html',
  styleUrls: ['./messy-state.component.scss']
})
export class MessyStateComponent implements OnInit {
  happy = true;

  constructor(public readonly stateManagementService: StateManagementService) { }

  ngOnInit(): void {
  }

  changeState(newState: boolean): void {
    this.happy = newState;
    this.stateManagementService.changeState(newState);
  }
}
