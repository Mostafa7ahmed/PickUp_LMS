import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskStudentComponent } from './edit-task-student.component';

describe('EditTaskStudentComponent', () => {
  let component: EditTaskStudentComponent;
  let fixture: ComponentFixture<EditTaskStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaskStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
