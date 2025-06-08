import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdeatePorfileComponent } from './updeate-porfile.component';

describe('UpdeatePorfileComponent', () => {
  let component: UpdeatePorfileComponent;
  let fixture: ComponentFixture<UpdeatePorfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdeatePorfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdeatePorfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
