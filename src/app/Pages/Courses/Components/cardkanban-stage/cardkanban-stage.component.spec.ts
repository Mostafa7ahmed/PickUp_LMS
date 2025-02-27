import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardkanbanStageComponent } from './cardkanban-stage.component';

describe('CardkanbanStageComponent', () => {
  let component: CardkanbanStageComponent;
  let fixture: ComponentFixture<CardkanbanStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardkanbanStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardkanbanStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
