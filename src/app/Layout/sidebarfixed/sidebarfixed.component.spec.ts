import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarfixedComponent } from './sidebarfixed.component';

describe('SidebarfixedComponent', () => {
  let component: SidebarfixedComponent;
  let fixture: ComponentFixture<SidebarfixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarfixedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarfixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
