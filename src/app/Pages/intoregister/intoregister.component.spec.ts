import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntoregisterComponent } from './intoregister.component';

describe('IntoregisterComponent', () => {
  let component: IntoregisterComponent;
  let fixture: ComponentFixture<IntoregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntoregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntoregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
