import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourseDetealisStudentComponent } from './my-course-detealis-student.component';

describe('MyCourseDetealisStudentComponent', () => {
  let component: MyCourseDetealisStudentComponent;
  let fixture: ComponentFixture<MyCourseDetealisStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCourseDetealisStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCourseDetealisStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
