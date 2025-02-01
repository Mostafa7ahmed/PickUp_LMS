import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPopComponent } from './top-pop.component';

describe('TopPopComponent', () => {
  let component: TopPopComponent;
  let fixture: ComponentFixture<TopPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
