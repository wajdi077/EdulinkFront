import { TestBed } from '@angular/core/testing';

import { StatistiqueServiceService } from './statistique-service.service';

describe('StatistiqueServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatistiqueServiceService = TestBed.get(StatistiqueServiceService);
    expect(service).toBeTruthy();
  });
});
