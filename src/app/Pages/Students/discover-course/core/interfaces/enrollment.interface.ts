export interface IEnrollmentRequest {
  courseId: number;
  couponCode: string;
  enrollmentMethod: number;
}

export interface IEnrollmentResponse {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: string;
  status: string;
  paymentStatus: string;
  finalPrice: number;
  originalPrice: number;
  discountApplied: number;
  couponUsed?: string;
}

export interface ICourseEnrollmentInfo {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  price: number;
  priceAfterDiscount: number;
  free: boolean;
  rating: number;
  studentsCount: number;
  lessonssCount: number;
  duration: number;
  instructor: {
    id: number;
    name: string;
    photo: string;
  };
  discount?: {
    amount: number;
    type: number;
  };
}

export enum EnrollmentMethod {
  Free = 0,
  Paid = 1,
  Coupon = 2
}
