import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardtodoComponent } from './cardtodo.component';

describe('CardtodoComponent', () => {
  let component: CardtodoComponent;
  let fixture: ComponentFixture<CardtodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardtodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
