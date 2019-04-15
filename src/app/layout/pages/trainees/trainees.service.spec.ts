import { TestBed } from '@angular/core/testing';

import { TraineesService } from './trainees.service';

describe('TraineesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraineesService = TestBed.get(TraineesService);
    expect(service).toBeTruthy();
  });
});
