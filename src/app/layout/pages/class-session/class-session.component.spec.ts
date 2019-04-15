import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSessionComponent } from './class-session.component';

describe('ClassSessionComponent', () => {
  let component: ClassSessionComponent;
  let fixture: ComponentFixture<ClassSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
