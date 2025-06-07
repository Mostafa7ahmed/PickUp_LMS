import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskStudentComponent } from './add-task-student.component';

describe('AddTaskStudentComponent', () => {
  let component: AddTaskStudentComponent;
  let fixture: ComponentFixture<AddTaskStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
