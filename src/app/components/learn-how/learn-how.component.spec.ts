import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnHowComponent } from './learn-how.component';

describe('LearnHowComponent', () => {
  let component: LearnHowComponent;
  let fixture: ComponentFixture<LearnHowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnHowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnHowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
