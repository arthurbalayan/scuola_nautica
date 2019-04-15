import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatSessionEditComponent } from './boat-session-edit.component';

describe('BoatSessionEditComponent', () => {
  let component: BoatSessionEditComponent;
  let fixture: ComponentFixture<BoatSessionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatSessionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatSessionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
