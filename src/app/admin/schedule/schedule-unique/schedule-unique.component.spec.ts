import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleUniqueComponent } from './schedule-unique.component';

describe('ScheduleUniqueComponent', () => {
  let component: ScheduleUniqueComponent;
  let fixture: ComponentFixture<ScheduleUniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleUniqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleUniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
