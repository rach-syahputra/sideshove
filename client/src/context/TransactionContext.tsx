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
  loadingLabel: string;
  setLoadingLabel: Dispatch<SetStateAction<string>>;
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
  const [loadingLabel, setLoadingLabel] = useState<string>("");

  const fetchTransactions = async () => {
    setIsLoading(true);
    setLoadingLabel(
      type === "PA"
        ? "Creating pre-authorize payment..."
        : type === "CP"
        ? "Capturing payment..."
        : type === "RF"
        ? "Refunding payment..."
        : "Creating payment..."
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments?type=${
        type !== "ALL" ? type : ""
      }`
    );

    const data = await response.json();

    setPayments(data.data);
    setIsLoading(false);
    setLoadingLabel("");
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
        loadingLabel,
        setLoadingLabel,
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
