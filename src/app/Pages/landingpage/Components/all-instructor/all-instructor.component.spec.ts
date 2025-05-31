import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInstructorComponent } from './all-instructor.component';

describe('AllInstructorComponent', () => {
  let component: AllInstructorComponent;
  let fixture: ComponentFixture<AllInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
