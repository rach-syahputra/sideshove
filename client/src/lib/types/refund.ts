export interface CreateRefundRequest {
  paymentId: string;
  amount: number;
  email?: string;
  mobileNumber?: string;
}
