import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageStudentComponent } from './homepage-student.component';

describe('HomepageStudentComponent', () => {
  let component: HomepageStudentComponent;
  let fixture: ComponentFixture<HomepageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
