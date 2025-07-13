export interface CreateRefundRequest {
  paymentId: string;
  email?: string;
  mobileNumber?: string;
  amount: number;
}
