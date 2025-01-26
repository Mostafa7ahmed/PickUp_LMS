import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarinstructorComponent } from './navbarinstructor.component';

describe('NavbarinstructorComponent', () => {
  let component: NavbarinstructorComponent;
  let fixture: ComponentFixture<NavbarinstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarinstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarinstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
