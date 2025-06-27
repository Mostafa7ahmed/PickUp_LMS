import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverCourseDetailsComponent } from './discover-course-details.component';

describe('DiscoverCourseDetailsComponent', () => {
  let component: DiscoverCourseDetailsComponent;
  let fixture: ComponentFixture<DiscoverCourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverCourseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
