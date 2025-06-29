import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddandShowRatingComponent } from './addand-show-rating.component';

describe('AddandShowRatingComponent', () => {
  let component: AddandShowRatingComponent;
  let fixture: ComponentFixture<AddandShowRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddandShowRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddandShowRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
