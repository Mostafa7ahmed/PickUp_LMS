import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCoupanComponent } from './widget-coupan.component';

describe('WidgetCoupanComponent', () => {
  let component: WidgetCoupanComponent;
  let fixture: ComponentFixture<WidgetCoupanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetCoupanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetCoupanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
