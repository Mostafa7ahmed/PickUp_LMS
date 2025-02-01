import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopdeletetopicComponent } from './popdeletetopic.component';

describe('PopdeletetopicComponent', () => {
  let component: PopdeletetopicComponent;
  let fixture: ComponentFixture<PopdeletetopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopdeletetopicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopdeletetopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
