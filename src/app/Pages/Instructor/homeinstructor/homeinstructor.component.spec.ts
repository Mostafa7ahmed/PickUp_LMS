import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeinstructorComponent } from './homeinstructor.component';

describe('HomeinstructorComponent', () => {
  let component: HomeinstructorComponent;
  let fixture: ComponentFixture<HomeinstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeinstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeinstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
