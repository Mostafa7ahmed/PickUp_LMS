export interface UpdateCouponPayload {
  id: number;
  code: string;
  limited: boolean;
  allowedUsage: number;
  discount: number;
  discountType: number;
  validFrom: string;
  validTo: string;
  notes: string;
  studentIds: number[];
}