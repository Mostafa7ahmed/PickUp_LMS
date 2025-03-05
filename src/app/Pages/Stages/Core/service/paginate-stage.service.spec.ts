import { TestBed } from '@angular/core/testing';

import { PaginateStageService } from './paginate-stage.service';

describe('PaginateStageService', () => {
  let service: PaginateStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginateStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
