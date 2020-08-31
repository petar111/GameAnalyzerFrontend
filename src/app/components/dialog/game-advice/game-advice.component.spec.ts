import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAdviceComponent } from './game-advice.component';

describe('GameAdviceComponent', () => {
  let component: GameAdviceComponent;
  let fixture: ComponentFixture<GameAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
