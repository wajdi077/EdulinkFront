import { TestBed } from '@angular/core/testing';

import { GestionPenalitesService } from './gestion-penalites.service';

describe('GestionPenalitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionPenalitesService = TestBed.get(GestionPenalitesService);
    expect(service).toBeTruthy();
  });
});
