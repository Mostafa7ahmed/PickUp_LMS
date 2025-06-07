import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetcourseStudentComponent } from './widgetcourse-student.component';

describe('WidgetcourseStudentComponent', () => {
  let component: WidgetcourseStudentComponent;
  let fixture: ComponentFixture<WidgetcourseStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetcourseStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetcourseStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
