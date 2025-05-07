import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLessonComponent } from './create-lesson.component';

describe('CreateLessonComponent', () => {
  let component: CreateLessonComponent;
  let fixture: ComponentFixture<CreateLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
