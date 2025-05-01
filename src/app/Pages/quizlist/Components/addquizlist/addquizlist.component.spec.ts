import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquizlistComponent } from './addquizlist.component';

describe('AddquizlistComponent', () => {
  let component: AddquizlistComponent;
  let fixture: ComponentFixture<AddquizlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddquizlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddquizlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
