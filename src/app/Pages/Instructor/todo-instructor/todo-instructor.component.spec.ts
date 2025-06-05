import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInstructorComponent } from './todo-instructor.component';

describe('TodoInstructorComponent', () => {
  let component: TodoInstructorComponent;
  let fixture: ComponentFixture<TodoInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
