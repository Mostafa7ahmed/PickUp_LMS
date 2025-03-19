import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectPriceOrFreeComponent } from './custom-select-price-or-free.component';

describe('CustomSelectPriceOrFreeComponent', () => {
  let component: CustomSelectPriceOrFreeComponent;
  let fixture: ComponentFixture<CustomSelectPriceOrFreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelectPriceOrFreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSelectPriceOrFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
