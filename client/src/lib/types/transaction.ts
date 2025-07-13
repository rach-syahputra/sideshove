export type TransactionStatusType =
  | "pending"
  | "active"
  | "success"
  | "failed"
  | "open";

export type TransactionRequestMethod = "SMS" | "EMAIL" | "WEB";

export type TransactionCurrencyType = "ZAR" | "EUR" | "USD" | "GBP";

export type PaymentFrequency = "ONE-TIME" | "MONTHLY" | "QUARTERLY" | "YEARLY";

export type PaymentStatusType =
  | "PENDING"
  | "PAID"
  | "EXPIRED"
  | "REFUNDED"
  | "CAPTURED";

export type PaymentType =
  | "DB"
  | "PA"
  | "CP"
  | "RF"
  | "CC.DB"
  | "CC.PA"
  | "CC.CP"
  | "CC.RF";

export type TransactionType = "once-off" | "pos-payment";

export interface Transaction {
  attach_recepit_on_email: boolean;
  chargeback: [];
  expiration_date: string;
  fixed_amount: boolean;
  invoice_url: string;
  merchant_phone_number: string;
  mobile_number: string;
  modified_at: string;
  moto_enabled: boolean;
  payment_date: string;
  payment_description: string;
  created_at: string;
  reference_number: string;
  payment_type: PaymentType;
  payment_frequency: PaymentFrequency;
  payment_id: string;
  payment_methods: string[];
  payment_start_date: string;
  refund: [];
  request_methods: TransactionRequestMethod[];
  reversal: [];
  send_mms_receipt: boolean;
  shipping_enabled: boolean;
  status_description: string;
  tax_id: string;
  template_id: string;
  transaction_id: string;
  email: string;
  amount: string;
  status: TransactionStatusType;
  currency: TransactionCurrencyType;
  url: string;
}

export interface Payment {
  payment_id: string;
  reference_payment_id: string;
  transaction_id: string;
  transaction_type: TransactionType;
  reference_number: string;
  mobile_number: string;
  email: string;
  amount: number;
  currency: TransactionCurrencyType;
  payment_type: PaymentType;
  payment_date: string;
  status: TransactionStatusType;
  result_description: string;
  payment_url: string;
  transaction_date: string;
}
