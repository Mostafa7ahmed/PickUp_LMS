import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStageComponent } from './card-stage.component';

describe('CardStageComponent', () => {
  let component: CardStageComponent;
  let fixture: ComponentFixture<CardStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
