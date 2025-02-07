import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpopuptopicComponent } from './editpopuptopic.component';

describe('EditpopuptopicComponent', () => {
  let component: EditpopuptopicComponent;
  let fixture: ComponentFixture<EditpopuptopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditpopuptopicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditpopuptopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
