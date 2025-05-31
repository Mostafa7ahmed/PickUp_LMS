import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyStudentsLoveComponent } from './why-students-love.component';

describe('WhyStudentsLoveComponent', () => {
  let component: WhyStudentsLoveComponent;
  let fixture: ComponentFixture<WhyStudentsLoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyStudentsLoveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyStudentsLoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
