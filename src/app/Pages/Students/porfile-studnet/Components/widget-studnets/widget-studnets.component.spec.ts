import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStudnetsComponent } from './widget-studnets.component';

describe('WidgetStudnetsComponent', () => {
  let component: WidgetStudnetsComponent;
  let fixture: ComponentFixture<WidgetStudnetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetStudnetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetStudnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
