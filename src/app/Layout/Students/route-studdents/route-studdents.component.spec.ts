import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteStuddentsComponent } from './route-studdents.component';

describe('RouteStuddentsComponent', () => {
  let component: RouteStuddentsComponent;
  let fixture: ComponentFixture<RouteStuddentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteStuddentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteStuddentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
