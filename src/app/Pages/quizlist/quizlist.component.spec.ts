import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizlistComponent } from './quizlist.component';

describe('QuizlistComponent', () => {
  let component: QuizlistComponent;
  let fixture: ComponentFixture<QuizlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
