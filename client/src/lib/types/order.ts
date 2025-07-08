type TransactionStatusType = "PENDING" | "SUCCESS" | "EXPIRED";

export interface Order {
  id: string;
  brand: string | null;
  amount: number;
  currency: string | null;
  holder: string | null;
  integrity: string;
  status: TransactionStatusType;
  code?: string;
  paidAt: Date | null;
  createdAt: Date;
}
