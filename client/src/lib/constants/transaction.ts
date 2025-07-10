import { getCountries, getCountryCallingCode } from "libphonenumber-js";
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

const phoneCodes = new Set<string>();
export const phonePrefixes = getCountries()
  .map((country) => {
    const code = `+${getCountryCallingCode(country)}`;
    return {
      label: `${code} (${country})`,
      value: code,
      key: `${country}-${code}`, // ensures uniqueness
    };
  })
  .filter(({ value }) => {
    if (phoneCodes.has(value)) return false;
    phoneCodes.add(value);
    return true;
  });
