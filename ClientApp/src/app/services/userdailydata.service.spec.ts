import { TestBed } from '@angular/core/testing';

import { UserdailydataService } from './userdailydata.service';

describe('UserdailydataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserdailydataService = TestBed.get(UserdailydataService);
    expect(service).toBeTruthy();
  });
});
