import { TestBed } from '@angular/core/testing';

import { ServingService } from './serving.service';

describe('ServingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServingService = TestBed.get(ServingService);
    expect(service).toBeTruthy();
  });
});
