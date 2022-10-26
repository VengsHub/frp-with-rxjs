import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessyStateComponent } from './messy-state.component';

describe('MessyStateComponent', () => {
  let component: MessyStateComponent;
  let fixture: ComponentFixture<MessyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessyStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
