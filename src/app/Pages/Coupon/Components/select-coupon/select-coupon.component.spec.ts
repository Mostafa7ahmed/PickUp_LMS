import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCouponComponent } from './select-coupon.component';

describe('SelectCouponComponent', () => {
  let component: SelectCouponComponent;
  let fixture: ComponentFixture<SelectCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCouponComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
