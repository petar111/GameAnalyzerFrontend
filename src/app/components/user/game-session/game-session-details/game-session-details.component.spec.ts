import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSessionDetailsComponent } from './game-session-details.component';

describe('GameSessionDetailsComponent', () => {
  let component: GameSessionDetailsComponent;
  let fixture: ComponentFixture<GameSessionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSessionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
