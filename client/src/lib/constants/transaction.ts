import {
  PaymentType,
  TransactionRequestMethod,
  TransactionType,
} from "../types/transaction";

interface RequestMethod {
  id: TransactionRequestMethod;
  label: string;
}

export const REQUEST_METHODS: RequestMethod[] = [
  {
    id: "EMAIL",
    label: "Email",
  },
  {
    id: "SMS",
    label: "SMS",
  },
];

export const CURRENCIES = [
  { id: "ZAR", label: "ZAR" },
  { id: "EUR", label: "EUR" },
  { id: "USD", label: "USD" },
  { id: "GBP", label: "GBP" },
];

export const PAYMENT_TYPE_LABELS: Record<PaymentType, string> = {
  PA: "Pre-Authorize",
  DB: "Debit",
  CP: "Capture",
  RF: "Refund",
  RV: "Reversal",
  "CC.PA": "Pre-Authorize",
  "CC.DB": "Debit",
  "CC.CP": "Capture",
  "CC.RF": "Refund",
  "CC.RV": "Reversal",
  "CC.SD": "Scheduled",
  "CC.RG": "Registration",
};

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  "once-off": "Single",
  "pos-payment": "Pos Payment",
  scheduled: "Recurring",
};
