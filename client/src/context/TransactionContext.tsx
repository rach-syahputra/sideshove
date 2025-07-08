"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { Payment } from "@/lib/types/transaction";

interface ITransactionContext {
  payments: Payment[];
  setPayments: Dispatch<SetStateAction<Payment[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  fetchTransactions: () => void;
}

const TransactionContext = createContext<ITransactionContext | undefined>(
  undefined
);

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [type, setType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTransactions = async () => {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments?type=${
        type !== "ALL" ? type : ""
      }`
    );

    const data = await response.json();

    setPayments(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, [type]);

  return (
    <TransactionContext.Provider
      value={{
        payments,
        setPayments,
        isLoading,
        setIsLoading,
        type,
        setType,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactionContext = (): ITransactionContext => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};

export { TransactionProvider, useTransactionContext };
