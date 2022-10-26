import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpredictableOrderComponent } from './unpredictable-order.component';

describe('UnpredictableOrderComponent', () => {
  let component: UnpredictableOrderComponent;
  let fixture: ComponentFixture<UnpredictableOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpredictableOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpredictableOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
