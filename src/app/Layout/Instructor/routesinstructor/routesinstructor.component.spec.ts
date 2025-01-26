import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesinstructorComponent } from './routesinstructor.component';

describe('RoutesinstructorComponent', () => {
  let component: RoutesinstructorComponent;
  let fixture: ComponentFixture<RoutesinstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesinstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesinstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
