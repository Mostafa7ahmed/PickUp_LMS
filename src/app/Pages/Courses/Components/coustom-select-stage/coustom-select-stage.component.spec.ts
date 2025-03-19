import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustomSelectStageComponent } from './coustom-select-stage.component';

describe('CoustomSelectStageComponent', () => {
  let component: CoustomSelectStageComponent;
  let fixture: ComponentFixture<CoustomSelectStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoustomSelectStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoustomSelectStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
