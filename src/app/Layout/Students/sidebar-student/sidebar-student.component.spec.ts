import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarStudentComponent } from './sidebar-student.component';

describe('SidebarStudentComponent', () => {
  let component: SidebarStudentComponent;
  let fixture: ComponentFixture<SidebarStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
