import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectLanguageComponent } from './custom-select-language.component';

describe('CustomSelectLanguageComponent', () => {
  let component: CustomSelectLanguageComponent;
  let fixture: ComponentFixture<CustomSelectLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelectLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSelectLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
