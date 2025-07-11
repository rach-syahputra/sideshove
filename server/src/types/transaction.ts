import { Pagination } from "./pagination";

export type TransactionRequestMethodType = "SMS" | "EMAIL" | "WEB";
export type CurrencyType = "ZAR" | "EUR" | "USD" | "GBP";
export type PaymentType = "PA" | "DB" | "CP" | "RF" | "RV";

export interface GetTransactionsRequest extends Pagination {}

export interface GetTransactionDetailRequest {
  transactionId: string;
}

export interface CreateTransactionRequest {
  requestMethods: TransactionRequestMethodType[];
  referenceNumber: string;
  email: string;
  currency: CurrencyType;
  amount: number;
  paymentType: PaymentType;
  mobileNumber: string;
}

export interface UpdateTransactionRequest {
  transactionId: string;
  requestMethods: TransactionRequestMethodType[];
  referenceNumber: string;
  email: string;
  currency: CurrencyType;
  amount: number;
  paymentType: PaymentType;
  mobileNumber: string;
}
