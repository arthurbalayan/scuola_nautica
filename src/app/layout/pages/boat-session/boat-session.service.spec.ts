import { TestBed } from '@angular/core/testing';

import { BoatSessionService } from './boat-session.service';

describe('BoatSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoatSessionService = TestBed.get(BoatSessionService);
    expect(service).toBeTruthy();
  });
});
