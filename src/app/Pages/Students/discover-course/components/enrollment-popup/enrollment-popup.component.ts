import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TopPopComponent } from '../../../../../Components/top-pop/top-pop.component';
import { EnrollmentService } from '../../core/services/enrollment.service';
import { 
  IEnrollmentRequest, 
  ICourseEnrollmentInfo, 
  EnrollmentMethod 
} from '../../core/interfaces/enrollment.interface';

@Component({
  selector: 'app-enrollment-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TopPopComponent],
  templateUrl: './enrollment-popup.component.html',
  styleUrl: './enrollment-popup.component.scss'
})
export class EnrollmentPopupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private enrollmentService = inject(EnrollmentService);

  enrollmentForm: FormGroup;
  courseInfo: ICourseEnrollmentInfo | null = null;
  isLoading = false;
  isSubmitting = false;
  isVisible = true;
  courseId: number = 0;
  
  // Coupon validation
  isCouponValid = false;
  couponValidationMessage = '';
  isValidatingCoupon = false;
  appliedDiscount = 0;
  finalPrice = 0;

  // Enrollment methods
  EnrollmentMethod = EnrollmentMethod;
  selectedMethod: EnrollmentMethod = EnrollmentMethod.Paid;

  constructor() {
    this.enrollmentForm = this.fb.group({
      courseId: [0, [Validators.required]],
      couponCode: [''],
      enrollmentMethod: [EnrollmentMethod.Paid, [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Get course ID from route parameters
    this.route.queryParams.subscribe(params => {
      this.courseId = +params['courseId'] || 0;
      if (this.courseId) {
        this.enrollmentForm.patchValue({ courseId: this.courseId });
        this.loadCourseInfo();
      }
    });
  }

  loadCourseInfo(): void {
    this.isLoading = true;
    this.enrollmentService.getCourseForEnrollment(this.courseId).subscribe({
      next: (response) => {
        if (response.success && response.result) {
          this.courseInfo = response.result;
          this.finalPrice = this.courseInfo.priceAfterDiscount || this.courseInfo.price;
          this.selectedMethod = this.courseInfo.free ? EnrollmentMethod.Free : EnrollmentMethod.Paid;
          this.enrollmentForm.patchValue({ enrollmentMethod: this.selectedMethod });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading course info:', error);
        this.isLoading = false;
      }
    });
  }

  onEnrollmentMethodChange(method: EnrollmentMethod): void {
    this.selectedMethod = method;
    this.enrollmentForm.patchValue({ enrollmentMethod: method });
    
    if (method !== EnrollmentMethod.Coupon) {
      this.enrollmentForm.patchValue({ couponCode: '' });
      this.resetCouponValidation();
    }
    
    this.calculateFinalPrice();
  }

  validateCoupon(): void {
    const couponCode = this.enrollmentForm.get('couponCode')?.value;
    if (!couponCode || !this.courseInfo) return;

    this.isValidatingCoupon = true;
    this.enrollmentService.validateCoupon(this.courseId, couponCode).subscribe({
      next: (response) => {
        if (response.success) {
          this.isCouponValid = true;
          this.couponValidationMessage = 'Coupon applied successfully!';
          this.appliedDiscount = response.result?.discountAmount || 0;
          this.selectedMethod = EnrollmentMethod.Coupon;
          this.enrollmentForm.patchValue({ enrollmentMethod: EnrollmentMethod.Coupon });
        } else {
          this.isCouponValid = false;
          this.couponValidationMessage = 'Invalid or expired coupon code';
          this.appliedDiscount = 0;
        }
        this.calculateFinalPrice();
        this.isValidatingCoupon = false;
      },
      error: (error) => {
        this.isCouponValid = false;
        this.couponValidationMessage = 'Error validating coupon';
        this.appliedDiscount = 0;
        this.calculateFinalPrice();
        this.isValidatingCoupon = false;
      }
    });
  }

  resetCouponValidation(): void {
    this.isCouponValid = false;
    this.couponValidationMessage = '';
    this.appliedDiscount = 0;
    this.calculateFinalPrice();
  }

  calculateFinalPrice(): void {
    if (!this.courseInfo) return;

    if (this.selectedMethod === EnrollmentMethod.Free || this.courseInfo.free) {
      this.finalPrice = 0;
    } else if (this.selectedMethod === EnrollmentMethod.Coupon && this.isCouponValid) {
      this.finalPrice = Math.max(0, (this.courseInfo.priceAfterDiscount || this.courseInfo.price) - this.appliedDiscount);
    } else {
      this.finalPrice = this.courseInfo.priceAfterDiscount || this.courseInfo.price;
    }
  }

  onSubmit(): void {
    if (this.enrollmentForm.valid && this.courseInfo) {
      this.isSubmitting = true;
      const enrollmentData: IEnrollmentRequest = this.enrollmentForm.value;

      this.enrollmentService.enrollInCourse(enrollmentData).subscribe({
        next: (response) => {
          if (response.success) {
            // Success - redirect to my courses
            this.closePopup();
            this.router.navigate(['/Student/myCourse']);
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error enrolling in course:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  closePopup(): void {
    this.isVisible = false;
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  getMethodDisplayName(method: EnrollmentMethod): string {
    switch (method) {
      case EnrollmentMethod.Free:
        return 'Free Enrollment';
      case EnrollmentMethod.Paid:
        return 'Paid Enrollment';
      case EnrollmentMethod.Coupon:
        return 'Coupon Enrollment';
      default:
        return 'Unknown';
    }
  }
}
