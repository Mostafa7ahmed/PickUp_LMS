import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileStudentComponent } from './edit-profile-student.component';

describe('EditProfileStudentComponent', () => {
  let component: EditProfileStudentComponent;
  let fixture: ComponentFixture<EditProfileStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
