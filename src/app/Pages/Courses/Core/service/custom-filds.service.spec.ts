import { TestBed } from '@angular/core/testing';

import { CustomFildsService } from './custom-filds.service';

describe('CustomFildsService', () => {
  let service: CustomFildsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFildsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
