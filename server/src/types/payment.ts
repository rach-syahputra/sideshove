import { PaymentStatus, PaymentType } from "@prisma/client";

export interface CreatePaymentServiceRequest {
  amount: number;
  brand: string;
  currency: string;
  number: string;
  holder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  type: PaymentType;
}

export interface CreatePaymentRepositoryRequest {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  type: PaymentType;
  brand: string;
}

export interface GetAllPaymentRequest {
  type: PaymentType;
}

export interface UpdatePaymentRepositoryRequest {
  newPaymentId: string;
  referencedId: string;
  amount: number;
  currency: string;
  type: PaymentType;
}

export interface UpdatePaymentServiceRequest {
  referencedId: string;
  currency: string;
  type: PaymentType;
  amount: number;
}
