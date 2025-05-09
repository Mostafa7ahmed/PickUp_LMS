export interface ICouponResult {
    id?: number
    instructorId: number
    code: string
    notes: string
    active: boolean
    allowedUsage: number
    discountType: number
    discount: number
    validTo: string
    validFrom: string
    actualUsage: number
    course: Course
    priceAfterDiscount: number
    updater: Updater
    creator: Creator
    createdOn: string
    updatedOn: any
    students: Student[]
  }
  
  export interface Course {
    id: number
    createdOn: string
    price: number
    studentsCount: number
    couponsCount: number
  }
  
  export interface Creator {
    id: number
    name: string
    photo: string
  }
    export interface Updater {
    id: number
    name: string
    photo: string
  }
  
  export interface Student {
    id: number
    name: string
    email: string
    photo: string
    usedCoupon: boolean
  }
  