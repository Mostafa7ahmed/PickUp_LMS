import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, forkJoin } from 'rxjs';

import { WalletService } from '../../Core/Services/wallet.service';
import { EnrollmentService } from '../../Core/Services/enrollment.service';
import { IWallet } from '../../Core/Interface/iwallet';
import { ICoupon, IEnrollmentRequest, EnrollmentMethod, DiscountType } from '../../Core/Interface/ienrollment';
import { TopPopComponent } from '../top-pop/top-pop.component';

export interface ICourseForEnrollment {
  id: number;
  name: string;
  originalPrice: number;
  discountPrice?: number;
  currency: string;
  photo: string;
  instructor: {
    name: string;
    photo?: string;
  };
}

@Component({
  selector: 'app-enrollment-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, TopPopComponent],
  templateUrl: './enrollment-popup.component.html',
  styleUrl: './enrollment-popup.component.scss'
})
export class EnrollmentPopupComponent implements OnInit, OnDestroy {
  @Input() course!: ICourseForEnrollment;
  @Input() isVisible: boolean = false;
  @Output() enrollmentComplete = new EventEmitter<boolean>();
  @Output() closePopup = new EventEmitter<void>();

  wallet: IWallet | null = null;
  coupons: ICoupon[] = [];
  selectedCoupon: ICoupon | null = null;
  selectedCouponCode: string = '';
  
  finalPrice: number = 0;
  discountAmount: number = 0;
  isLoading: boolean = false;
  isEnrolling: boolean = false;
  errorMessage: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private walletService: WalletService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.calculatePricing();
    this.loadWalletAndCoupons();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadWalletAndCoupons(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Check authentication
    const token = localStorage.getItem('UserAuth');
    console.log('Authentication token exists:', !!token);
    if (!token) {
      this.errorMessage = 'Authentication required. Please log in again.';
      this.isLoading = false;
      return;
    }

    // Load wallet first (essential), then try to load coupons (optional)
    this.walletService.getWallet().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (walletResponse) => {
        console.log('Wallet API response:', walletResponse);
        
        if (walletResponse.success && walletResponse.result) {
          this.wallet = walletResponse.result;
          console.log('Parsed wallet:', this.wallet);
          console.log('Wallet balance:', this.wallet?.balance);
          
          // Now try to load coupons (non-blocking)
          this.loadCoupons();
        } else {
          console.error('Wallet API returned unsuccessful response:', walletResponse);
          this.errorMessage = 'Failed to load wallet information. Please try again.';
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading wallet:', error);
        console.error('Error details:', error.error);
        console.error('Status code:', error.status);
        
        if (error.status === 401) {
          this.errorMessage = 'Authentication required. Please log in again.';
        } else if (error.status === 404) {
          this.errorMessage = 'Wallet service not found. Please contact support.';
        } else {
          this.errorMessage = `Failed to load wallet information: ${error.message || 'Unknown error'}`;
        }
        
        this.isLoading = false;
      }
    });
  }

  private loadCoupons(): void {
    this.enrollmentService.getUserCoupons().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (couponsResponse) => {
        console.log('Coupons API response:', couponsResponse);
        
        if (couponsResponse.success && couponsResponse.result) {
          this.coupons = couponsResponse.result;
        } else {
          this.coupons = [];
        }
        console.log('Loaded coupons:', this.coupons);
      },
      error: (error) => {
        console.warn('Error loading coupons (non-critical):', error);
        this.coupons = []; // Just set empty array if coupons fail to load
      }
    });
  }

  calculatePricing(): void {
    this.discountAmount = 0;
    this.finalPrice = this.course.originalPrice;

    // Apply course discount if exists
    if (this.course.discountPrice && this.course.discountPrice < this.course.originalPrice) {
      this.discountAmount = this.course.originalPrice - this.course.discountPrice;
      this.finalPrice = this.course.discountPrice;
    }

    // Apply coupon discount if selected
    if (this.selectedCoupon) {
      let couponDiscount = 0;
      if (this.selectedCoupon.discountType === DiscountType.Percentage) {
        couponDiscount = (this.finalPrice * this.selectedCoupon.discountValue) / 100;
      } else {
        couponDiscount = this.selectedCoupon.discountValue;
      }
      
      this.discountAmount += couponDiscount;
      this.finalPrice = Math.max(0, this.finalPrice - couponDiscount);
    }
  }

  onCouponSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const couponCode = target.value;
    
    if (couponCode) {
      this.selectedCoupon = this.coupons.find(c => c.code === couponCode) || null;
      this.selectedCouponCode = couponCode;
    } else {
      this.selectedCoupon = null;
      this.selectedCouponCode = '';
    }
    
    this.calculatePricing();
  }

  canAffordCourse(): boolean {
    return this.wallet ? this.wallet.balance >= this.finalPrice : false;
  }

  enrollInCourse(): void {
    if (!this.wallet || this.isEnrolling) return;

    if (this.finalPrice > 0 && !this.canAffordCourse()) {
      this.errorMessage = 'Insufficient wallet balance. Please add funds to your wallet.';
      return;
    }

    this.isEnrolling = true;
    this.errorMessage = '';

    const enrollmentRequest: IEnrollmentRequest = {
      courseId: this.course.id,
      enrollmentMethod: this.finalPrice === 0 ? EnrollmentMethod.Free : EnrollmentMethod.Wallet,
      couponCode: this.selectedCouponCode || undefined
    };

    this.enrollmentService.createEnrollment(enrollmentRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Enrollment successful:', response);
          this.enrollmentComplete.emit(true);
          this.onClose();
        },
        error: (error) => {
          console.error('Enrollment failed:', error);
          this.errorMessage = error.error?.message || 'Enrollment failed. Please try again.';
          this.isEnrolling = false;
        }
      });
  }

  onClose(): void {
    this.closePopup.emit();
    this.resetComponent();
  }

  private resetComponent(): void {
    this.selectedCoupon = null;
    this.selectedCouponCode = '';
    this.errorMessage = '';
    this.isEnrolling = false;
    this.calculatePricing();
  }

  // Helper methods for template
  getDiscountPercentage(): number {
    if (this.course.originalPrice === 0) return 0;
    return Math.round((this.discountAmount / this.course.originalPrice) * 100);
  }

  isValidCoupon(coupon: ICoupon): boolean {
    if (!coupon.isActive) return false;
    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) return false;
    if (coupon.minimumAmount && this.course.originalPrice < coupon.minimumAmount) return false;
    return true;
  }
} 