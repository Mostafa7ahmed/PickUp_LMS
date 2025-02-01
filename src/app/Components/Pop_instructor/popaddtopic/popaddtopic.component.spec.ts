import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopaddtopicComponent } from './popaddtopic.component';

describe('PopaddtopicComponent', () => {
  let component: PopaddtopicComponent;
  let fixture: ComponentFixture<PopaddtopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopaddtopicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopaddtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
