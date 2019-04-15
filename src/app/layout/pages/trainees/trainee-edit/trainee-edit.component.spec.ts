import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeEditComponent } from './trainee-edit.component';

describe('TraineeEditComponent', () => {
  let component: TraineeEditComponent;
  let fixture: ComponentFixture<TraineeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
