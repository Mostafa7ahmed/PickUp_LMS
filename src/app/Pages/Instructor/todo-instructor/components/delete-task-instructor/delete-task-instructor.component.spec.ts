import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskInstructorComponent } from './delete-task-instructor.component';

describe('DeleteTaskInstructorComponent', () => {
  let component: DeleteTaskInstructorComponent;
  let fixture: ComponentFixture<DeleteTaskInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTaskInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTaskInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
