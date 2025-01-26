import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfileComponent } from './porfile.component';

describe('PorfileComponent', () => {
  let component: PorfileComponent;
  let fixture: ComponentFixture<PorfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
