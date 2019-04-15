import { TestBed } from '@angular/core/testing';

import { NgxdatatableService } from './ngxdatatable.service';

describe('NgxdatatableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxdatatableService = TestBed.get(NgxdatatableService);
    expect(service).toBeTruthy();
  });
});
