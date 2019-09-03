import { TestBed } from '@angular/core/testing';

import { GestionParrainService } from './gestion-parrain.service';

describe('GestionParrainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionParrainService = TestBed.get(GestionParrainService);
    expect(service).toBeTruthy();
  });
});
