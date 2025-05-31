import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcourseComponent } from './allcourse.component';

describe('AllcourseComponent', () => {
  let component: AllcourseComponent;
  let fixture: ComponentFixture<AllcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllcourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
