import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
