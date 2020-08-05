import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMatchComponent } from './game-match.component';

describe('GameMatchComponent', () => {
  let component: GameMatchComponent;
  let fixture: ComponentFixture<GameMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
