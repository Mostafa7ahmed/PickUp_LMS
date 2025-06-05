import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtasktodoComponent } from './addtasktodo.component';

describe('AddtasktodoComponent', () => {
  let component: AddtasktodoComponent;
  let fixture: ComponentFixture<AddtasktodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtasktodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtasktodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
