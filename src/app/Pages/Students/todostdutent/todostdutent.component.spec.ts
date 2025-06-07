import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodostdutentComponent } from './todostdutent.component';

describe('TodostdutentComponent', () => {
  let component: TodostdutentComponent;
  let fixture: ComponentFixture<TodostdutentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodostdutentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodostdutentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
