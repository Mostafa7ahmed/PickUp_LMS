import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReatingCardsComponent } from './reating-cards.component';

describe('ReatingCardsComponent', () => {
  let component: ReatingCardsComponent;
  let fixture: ComponentFixture<ReatingCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReatingCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReatingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
