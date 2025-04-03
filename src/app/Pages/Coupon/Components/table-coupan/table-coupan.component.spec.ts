import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCoupanComponent } from './table-coupan.component';

describe('TableCoupanComponent', () => {
  let component: TableCoupanComponent;
  let fixture: ComponentFixture<TableCoupanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCoupanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCoupanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
