import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesstudentsComponent } from './routesstudents.component';

describe('RoutesstudentsComponent', () => {
  let component: RoutesstudentsComponent;
  let fixture: ComponentFixture<RoutesstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesstudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
