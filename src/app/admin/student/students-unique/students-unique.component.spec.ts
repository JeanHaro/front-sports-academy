import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsUniqueComponent } from './students-unique.component';

describe('StudentsUniqueComponent', () => {
  let component: StudentsUniqueComponent;
  let fixture: ComponentFixture<StudentsUniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsUniqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsUniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
