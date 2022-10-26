import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedFirstEventComponent } from './missed-first-event.component';

describe('MissedFirstEventComponent', () => {
  let component: MissedFirstEventComponent;
  let fixture: ComponentFixture<MissedFirstEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedFirstEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedFirstEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
