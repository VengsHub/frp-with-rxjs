import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentalRecursionComponent } from './accidental-recursion.component';

describe('AccidentalRecursionComponent', () => {
  let component: AccidentalRecursionComponent;
  let fixture: ComponentFixture<AccidentalRecursionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccidentalRecursionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentalRecursionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
