import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatSessionComponent } from './boat-session.component';

describe('BoatSessionComponent', () => {
  let component: BoatSessionComponent;
  let fixture: ComponentFixture<BoatSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
