import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureForInstructorComponent } from './feature-for-instructor.component';

describe('FeatureForInstructorComponent', () => {
  let component: FeatureForInstructorComponent;
  let fixture: ComponentFixture<FeatureForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureForInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
