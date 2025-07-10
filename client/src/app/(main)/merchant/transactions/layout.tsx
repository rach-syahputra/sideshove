import { ReactNode } from "react";
import { TransactionProvider } from "@/context/TransactionContext";

const TransactionsLayout = ({ children }: { children: ReactNode }) => {
  return <TransactionProvider>{children}</TransactionProvider>;
};

export default TransactionsLayout;
