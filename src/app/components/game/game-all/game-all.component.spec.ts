import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAllComponent } from './game-all.component';

describe('GameAllComponent', () => {
  let component: GameAllComponent;
  let fixture: ComponentFixture<GameAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
