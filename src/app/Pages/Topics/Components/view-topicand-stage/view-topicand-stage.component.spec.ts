import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTopicandStageComponent } from './view-topicand-stage.component';

describe('ViewTopicandStageComponent', () => {
  let component: ViewTopicandStageComponent;
  let fixture: ComponentFixture<ViewTopicandStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTopicandStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTopicandStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
