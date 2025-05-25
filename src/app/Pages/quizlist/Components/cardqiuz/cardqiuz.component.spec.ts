import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardqiuzComponent } from './cardqiuz.component';

describe('CardqiuzComponent', () => {
  let component: CardqiuzComponent;
  let fixture: ComponentFixture<CardqiuzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardqiuzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardqiuzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
