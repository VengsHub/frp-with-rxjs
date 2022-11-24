import { Component, OnInit } from '@angular/core';
import { StateManagementService } from '../services/state-management.service';

@Component({
  selector: 'app-messy-state',
  templateUrl: './messy-state.component.html',
  styleUrls: ['./messy-state.component.scss']
})
export class MessyStateComponent implements OnInit {
  constructor(public readonly stateManagementService: StateManagementService) { }

  ngOnInit(): void {
  }
}
