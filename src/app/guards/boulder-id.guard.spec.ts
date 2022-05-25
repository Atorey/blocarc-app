import { TestBed } from '@angular/core/testing';

import { BoulderIdGuard } from './boulder-id.guard';

describe('BoulderIdGuard', () => {
  let guard: BoulderIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BoulderIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
