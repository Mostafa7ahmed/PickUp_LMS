export interface ICouponRespone {
    id: number
    code: string
    notes: string
    allowedUsage: number
    actualUsage: number
    validFrom: string
    validTo: string
    limited: boolean
    discountType: number
    discount: number
    priceAfterDiscount: number
    students: Student[]
}
export interface Student {
    studentId: number
    userId: number
    name: string
    email: string
    photoUrl: string
  }
  