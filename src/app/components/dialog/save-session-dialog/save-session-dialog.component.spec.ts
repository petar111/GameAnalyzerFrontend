import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSessionDialogComponent } from './save-session-dialog.component';

describe('SaveSessionDialogComponent', () => {
  let component: SaveSessionDialogComponent;
  let fixture: ComponentFixture<SaveSessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveSessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
