import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUsComponent } from './card-us.component';

describe('CardUsComponent', () => {
  let component: CardUsComponent;
  let fixture: ComponentFixture<CardUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
