import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsPreviewComponent } from './course-details-preview.component';

describe('CourseDetailsPreviewComponent', () => {
  let component: CourseDetailsPreviewComponent;
  let fixture: ComponentFixture<CourseDetailsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailsPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 