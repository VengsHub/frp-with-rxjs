import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeakingCallbacksComponent } from './leaking-callbacks.component';

describe('LeakingCallbacksComponent', () => {
  let component: LeakingCallbacksComponent;
  let fixture: ComponentFixture<LeakingCallbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeakingCallbacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeakingCallbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
