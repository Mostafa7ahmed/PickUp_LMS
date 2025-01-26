import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isloginguardsGuard } from './isloginguards.guard';

describe('isloginguardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isloginguardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
