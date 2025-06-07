import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTaskStudentComponent } from './card-task-student.component';

describe('CardTaskStudentComponent', () => {
  let component: CardTaskStudentComponent;
  let fixture: ComponentFixture<CardTaskStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTaskStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTaskStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
