import { TestBed } from '@angular/core/testing';

import { TimerResolver } from './timer.resolver';

describe('TimerResolver', () => {
  let resolver: TimerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TimerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
