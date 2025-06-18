import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskInstructorComponent } from './edit-task-instructor.component';

describe('EditTaskInstructorComponent', () => {
  let component: EditTaskInstructorComponent;
  let fixture: ComponentFixture<EditTaskInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaskInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
