import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDiscoverPageComponent } from './card-discover-page.component';

describe('CardDiscoverPageComponent', () => {
  let component: CardDiscoverPageComponent;
  let fixture: ComponentFixture<CardDiscoverPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDiscoverPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDiscoverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
