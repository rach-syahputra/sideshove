export type PaymentStatusType =
  | "PENDING"
  | "PAID"
  | "EXPIRED"
  | "REFUNDED"
  | "CAPTURED";
export type PaymentType = "DB" | "PA" | "CP" | "RF";

export interface Payment {
  id: string;
  brand: string | null;
  amount: number;
  currency: string | null;
  type: PaymentType;
  integrity: string | null;
  status: PaymentStatusType;
  code?: string;
  paidAt: Date | null;
  updatedAt: Date | null;
  createdAt: Date;
}
