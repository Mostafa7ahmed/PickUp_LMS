import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletPopupInstructorComponent } from './wallet-popup-instructor.component';

describe('WalletPopupInstructorComponent', () => {
  let component: WalletPopupInstructorComponent;
  let fixture: ComponentFixture<WalletPopupInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletPopupInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletPopupInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
