import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfileStudnetComponent } from './porfile-studnet.component';

describe('PorfileStudnetComponent', () => {
  let component: PorfileStudnetComponent;
  let fixture: ComponentFixture<PorfileStudnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorfileStudnetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorfileStudnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
