import { ReactNode } from "react";
import { PaymentProvider } from "@/context/PaymentContext";

const TransactionsLayout = ({ children }: { children: ReactNode }) => {
  return <PaymentProvider>{children}</PaymentProvider>;
};

export default TransactionsLayout;
