import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notloginguardsGuard } from './notloginguards.guard';

describe('notloginguardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notloginguardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
