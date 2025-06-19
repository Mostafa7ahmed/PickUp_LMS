import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLessonComponent } from './delete-lesson.component';

describe('DeleteLessonComponent', () => {
  let component: DeleteLessonComponent;
  let fixture: ComponentFixture<DeleteLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
