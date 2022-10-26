import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadingIssuesComponent } from './threading-issues.component';

describe('ThreadingIssuesComponent', () => {
  let component: ThreadingIssuesComponent;
  let fixture: ComponentFixture<ThreadingIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadingIssuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadingIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
