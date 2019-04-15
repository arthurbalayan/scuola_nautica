import { TestBed } from '@angular/core/testing';

import { ClassSessionService } from './class-session.service';

describe('ClassSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassSessionService = TestBed.get(ClassSessionService);
    expect(service).toBeTruthy();
  });
});
