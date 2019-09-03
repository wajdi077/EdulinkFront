import { TestBed } from '@angular/core/testing';

import { UpdateemploisserviceService } from './updateemploisservice.service';

describe('UpdateemploisserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateemploisserviceService = TestBed.get(UpdateemploisserviceService);
    expect(service).toBeTruthy();
  });
});
