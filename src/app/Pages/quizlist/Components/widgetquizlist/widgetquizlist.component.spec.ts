import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetquizlistComponent } from './widgetquizlist.component';

describe('WidgetquizlistComponent', () => {
  let component: WidgetquizlistComponent;
  let fixture: ComponentFixture<WidgetquizlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetquizlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetquizlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
