import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseComponent } from './view-course.component';

describe('ViewCourseComponent', () => {
  let component: ViewCourseComponent;
  let fixture: ComponentFixture<ViewCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
