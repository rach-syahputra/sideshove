export type TransactionStatusType =
  | "pending"
  | "active"
  | "success"
  | "failed"
  | "open";

export type TransactionRequestMethod = "SMS" | "EMAIL" | "WEB";

export type PaymentFrequency = "ONE-TIME" | "MONTHLY" | "QUARTERLY" | "YEARLY";

export type PaymentStatusType =
  | "PENDING"
  | "PAID"
  | "EXPIRED"
  | "REFUNDED"
  | "CAPTURED";
export type PaymentType = "DB" | "PA" | "CP" | "RF";

export interface Transaction {
  created_at: string;
  reference_number: string;
  payment_type: PaymentType;
  payment_frequency: PaymentFrequency;
  email: string;
  amount: string;
  status: TransactionStatusType;
  currency: string;
  url: string;
}

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
