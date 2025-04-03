export interface ICreateCoupon {
    courseId: number
    code: string
    active: boolean
    limited: boolean
    allowedUsage: number
    discount: number
    discountType: number
    validFrom: string
    validTo: string
    notes: string
    studentIds: number[]
}
