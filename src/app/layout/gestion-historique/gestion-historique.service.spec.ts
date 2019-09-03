import { TestBed } from '@angular/core/testing';

import { GestionHistoriqueService } from './gestion-historique.service';

describe('GestionHistoriqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionHistoriqueService = TestBed.get(GestionHistoriqueService);
    expect(service).toBeTruthy();
  });
});
