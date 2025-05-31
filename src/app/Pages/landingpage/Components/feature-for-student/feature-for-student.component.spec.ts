import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureForStudentComponent } from './feature-for-student.component';

describe('FeatureForStudentComponent', () => {
  let component: FeatureForStudentComponent;
  let fixture: ComponentFixture<FeatureForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureForStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
