import { TestBed, inject } from '@angular/core/testing';

import { EspaceprofesseurService } from './espaceprofesseur.service';

describe('EspaceprofesseurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspaceprofesseurService]
    });
  });

  it('should be created', inject([EspaceprofesseurService], (service: EspaceprofesseurService) => {
    expect(service).toBeTruthy();
  }));
});
