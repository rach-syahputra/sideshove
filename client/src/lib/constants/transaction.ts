import { TransactionRequestMethod } from "../types/transaction";

interface RequestMethod {
  id: TransactionRequestMethod;
  label: string;
}

export const REQUEST_METHODS: RequestMethod[] = [
  {
    id: "EMAIL",
    label: "Email",
  },
];

export const CURRENCIES = [
  { id: "ZAR", label: "ZAR" },
  { id: "EUR", label: "EUR" },
  { id: "USD", label: "USD" },
  { id: "GBP", label: "GBP" },
];
