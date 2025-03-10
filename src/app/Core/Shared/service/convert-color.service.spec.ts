import { TestBed } from '@angular/core/testing';

import { ConvertColorService } from './convert-color.service';

describe('ConvertColorService', () => {
  let service: ConvertColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
