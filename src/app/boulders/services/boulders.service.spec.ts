import { TestBed } from '@angular/core/testing';

import { BouldersService } from './boulders.service';

describe('BouldersService', () => {
  let service: BouldersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouldersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
