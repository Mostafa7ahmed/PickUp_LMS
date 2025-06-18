import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectonViewComponent } from './selecton-view.component';

describe('SelectonViewComponent', () => {
  let component: SelectonViewComponent;
  let fixture: ComponentFixture<SelectonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectonViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
