import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStagesComponent } from './all-stages.component';

describe('AllStagesComponent', () => {
  let component: AllStagesComponent;
  let fixture: ComponentFixture<AllStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllStagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
