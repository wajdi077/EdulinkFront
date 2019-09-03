import { TestBed } from '@angular/core/testing';

import { EspaceParrainService } from './espace-parrain.service';

describe('EspaceParrainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EspaceParrainService = TestBed.get(EspaceParrainService);
    expect(service).toBeTruthy();
  });
});
