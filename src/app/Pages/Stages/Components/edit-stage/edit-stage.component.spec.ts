import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStageComponent } from './edit-stage.component';

describe('EditStageComponent', () => {
  let component: EditStageComponent;
  let fixture: ComponentFixture<EditStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
