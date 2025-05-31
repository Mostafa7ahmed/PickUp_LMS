import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface WalletInfo {
  balance: number;
  currency: string;
}

interface CourseEnrollment {
  id: number;
  title: string;
  originalPrice: number;
  finalPrice: number;
  currency: string;
  discount?: {
    amount: number;
    type: 'percentage' | 'fixed';
  };
}

@Component({
  selector: 'app-enroll-course-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './enroll-course-popup.component.html',
  styleUrls: ['./enroll-course-popup.component.scss']
})
export class EnrollCoursePopupComponent implements OnInit {
  
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  // Form for coupon code
  couponForm: FormGroup;
  
  // Component state
  isLoading = false;
  isCouponApplied = false;
  couponDiscount = 0;
  
  // Sample data - in real app, this would come from service
  walletInfo: WalletInfo = {
    balance: 12700,
    currency: 'EGP'
  };
  
  courseInfo: CourseEnrollment = {
    id: 1,
    title: 'Natural Language Processing',
    originalPrice: 299.00,
    finalPrice: 299.00,
    currency: 'USD'
  };

  constructor() {
    console.log('🏗️ EnrollCoursePopupComponent constructor called');
    
    this.couponForm = this.fb.group({
      couponCode: ['']
    });
    
    console.log('📋 Coupon form initialized:', this.couponForm);
    console.log('📋 Form valid:', this.couponForm.valid);
  }

  ngOnInit(): void {
    console.log('🚀 EnrollCoursePopupComponent initialized');
    console.log('Current route params:', this.route.params);
    
    // Get course ID from route params if needed
    this.route.params.subscribe(params => {
      console.log('Route params received:', params);
      if (params['courseId']) {
        console.log('Loading course info for ID:', params['courseId']);
        this.loadCourseInfo(+params['courseId']);
      }
    });
  }

  loadCourseInfo(courseId: number): void {
    // In real app, load course info from service
    console.log('Loading course info for ID:', courseId);
  }

  applyCoupon(): void {
    console.log('🎫 Apply coupon method called');
    console.log('🎫 Form valid:', this.couponForm.valid);
    console.log('🎫 Form values:', this.couponForm.value);
    
    this.isLoading = true;
    const couponCode = this.couponForm.get('couponCode')?.value;
    console.log('🎫 Coupon code:', couponCode);
    
    // Simulate API call
    setTimeout(() => {
      // Mock coupon validation
      if (couponCode && couponCode.toLowerCase() === 'code10') {
        console.log('✅ Valid coupon applied');
        this.couponDiscount = 20; // $20 discount
        this.isCouponApplied = true;
        this.courseInfo.finalPrice = this.courseInfo.originalPrice - this.couponDiscount;
      } else {
        console.log('❌ Invalid coupon or empty');
        // Invalid coupon or empty
        this.isCouponApplied = false;
        this.couponDiscount = 0;
      }
      this.isLoading = false;
    }, 1000);
  }

  getFinalPaymentAmount(): number {
    return this.courseInfo.finalPrice - this.couponDiscount;
  }

  confirmEnrollment(): void {
    console.log('💳 Confirm enrollment method called');
    this.isLoading = true;
    
    // Simulate enrollment process
    setTimeout(() => {
      console.log('✅ Enrolling in course:', this.courseInfo.title);
      console.log('💰 Payment amount:', this.getFinalPaymentAmount());
      
      // Close popup and redirect
      this.closePopup();
      this.isLoading = false;
    }, 2000);
  }

  closePopup(): void {
    console.log('❌ Close popup method called');
    // Determine correct route based on current URL
    const currentUrl = this.router.url;
    console.log('Current URL for routing:', currentUrl);
    
    if (currentUrl.includes('/Student')) {
      console.log('Navigating to Student route');
      this.router.navigate(['/Student', { outlets: { dialog: null } }]);
    } else if (currentUrl.includes('/Instructor')) {
      console.log('Navigating to Instructor route');
      this.router.navigate(['/Instructor', { outlets: { dialog: null } }]);
    } else {
      console.log('Defaulting to Student route');
      this.router.navigate(['/Student', { outlets: { dialog: null } }]);
    }
  }

  removeCoupon(): void {
    this.isCouponApplied = false;
    this.couponDiscount = 0;
    this.courseInfo.finalPrice = this.courseInfo.originalPrice;
    this.couponForm.get('couponCode')?.setValue('');
  }
} 