import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtpoicComponent } from './viewtpoic.component';

describe('ViewtpoicComponent', () => {
  let component: ViewtpoicComponent;
  let fixture: ComponentFixture<ViewtpoicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewtpoicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewtpoicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
