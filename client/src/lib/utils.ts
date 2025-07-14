import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TransactionRequestMethod } from "./types/transaction";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTransactionDetailDate = (date: Date) => {
  return date.toLocaleString("sv-SE", {
    timeZone: "Asia/Jakarta",
  });
};

export const getCustomer = ({
  email,
  mobileNumber,
}: {
  email?: string;
  mobileNumber?: string;
}): string => {
  let result = "";

  if (email && mobileNumber) {
    result = `${mobileNumber}(${email})`;
  } else if (mobileNumber) {
    result = mobileNumber;
  } else if (email) {
    result = email;
  }

  return result.length > 30 ? `${result.slice(0, 27)}...` : result;
};

export const getRequestMethods = (
  methods: TransactionRequestMethod[],
): string => {
  let method = "";

  if (methods.includes("EMAIL") && methods.includes("SMS")) {
    method = "Email & SMS";
  } else if (methods.includes("EMAIL")) {
    method = "Email";
  } else if (methods.includes("SMS")) {
    method = "SMS";
  } else {
    method = "-";
  }

  return method;
};
