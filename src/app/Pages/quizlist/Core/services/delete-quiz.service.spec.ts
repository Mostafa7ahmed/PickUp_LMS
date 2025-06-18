import { TestBed } from '@angular/core/testing';

import { DeleteQuizService } from './delete-quiz.service';

describe('DeleteQuizService', () => {
  let service: DeleteQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
