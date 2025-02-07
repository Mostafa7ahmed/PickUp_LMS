import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStagesComponent } from './add-stages.component';

describe('AddStagesComponent', () => {
  let component: AddStagesComponent;
  let fixture: ComponentFixture<AddStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
