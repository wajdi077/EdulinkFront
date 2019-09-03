import { TestBed } from '@angular/core/testing';

import { GestionArchiveService } from './gestion-archive.service';

describe('GestionArchiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionArchiveService = TestBed.get(GestionArchiveService);
    expect(service).toBeTruthy();
  });
});
