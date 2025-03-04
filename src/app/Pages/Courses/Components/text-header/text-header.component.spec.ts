import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextHeaderComponent } from './text-header.component';

describe('TextHeaderComponent', () => {
  let component: TextHeaderComponent;
  let fixture: ComponentFixture<TextHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
