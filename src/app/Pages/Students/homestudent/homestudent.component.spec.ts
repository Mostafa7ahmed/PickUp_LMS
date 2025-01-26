import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomestudentComponent } from './homestudent.component';

describe('HomestudentComponent', () => {
  let component: HomestudentComponent;
  let fixture: ComponentFixture<HomestudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomestudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
