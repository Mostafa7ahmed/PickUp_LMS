import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortAnswerComponent } from './short-answer.component';

describe('ShortAnswerComponent', () => {
  let component: ShortAnswerComponent;
  let fixture: ComponentFixture<ShortAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
