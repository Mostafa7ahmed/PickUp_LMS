import { TestBed } from '@angular/core/testing';

import { GetalltaskinstrctorService } from './getalltaskinstrctor.service';

describe('GetalltaskinstrctorService', () => {
  let service: GetalltaskinstrctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetalltaskinstrctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
