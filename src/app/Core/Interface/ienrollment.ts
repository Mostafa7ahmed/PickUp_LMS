export interface IEnrollmentRequest {
  courseId: number;
  couponCode?: string;
  enrollmentMethod: EnrollmentMethod;
}

export interface IEnrollmentResponse {
  enrollmentId: number;
  courseId: number;
  userId: number;
  enrollmentDate: string;
  status: EnrollmentStatus;
  totalPaid?: number;
  couponUsed?: string;
}

export interface ICoursePrice {
  originalPrice: number;
  discountAmount?: number;
  finalPrice: number;
  currency: string;
}

export interface ICoupon {
  id: number;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  isActive: boolean;
  expiryDate?: string;
  minimumAmount?: number;
}

export enum EnrollmentMethod {
  Wallet = 0,
  CreditCard = 1,
  Free = 2
}

export enum EnrollmentStatus {
  Pending = 0,
  Active = 1,
  Completed = 2,
  Cancelled = 3
}

export enum DiscountType {
  Percentage = 0,
  FixedAmount = 1
} 