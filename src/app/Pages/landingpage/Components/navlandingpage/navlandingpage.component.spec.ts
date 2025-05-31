import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavlandingpageComponent } from './navlandingpage.component';

describe('NavlandingpageComponent', () => {
  let component: NavlandingpageComponent;
  let fixture: ComponentFixture<NavlandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavlandingpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavlandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
