import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablequizlistComponent } from './tablequizlist.component';

describe('TablequizlistComponent', () => {
  let component: TablequizlistComponent;
  let fixture: ComponentFixture<TablequizlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablequizlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablequizlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
