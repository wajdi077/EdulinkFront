import { TestBed } from '@angular/core/testing';

import { DirecteurstatistiqueService } from './directeurstatistique.service';

describe('DirecteurstatistiqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirecteurstatistiqueService = TestBed.get(DirecteurstatistiqueService);
    expect(service).toBeTruthy();
  });
});
