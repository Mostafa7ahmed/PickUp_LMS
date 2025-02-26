import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablereusedComponent } from './tablereused.component';

describe('TablereusedComponent', () => {
  let component: TablereusedComponent;
  let fixture: ComponentFixture<TablereusedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablereusedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablereusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
