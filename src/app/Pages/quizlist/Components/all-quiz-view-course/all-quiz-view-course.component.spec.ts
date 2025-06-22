import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuizViewCourseComponent } from './all-quiz-view-course.component';

describe('AllQuizViewCourseComponent', () => {
  let component: AllQuizViewCourseComponent;
  let fixture: ComponentFixture<AllQuizViewCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllQuizViewCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllQuizViewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
