"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { Transaction } from "@/lib/types/transaction";

interface ITransactionContext {
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`
    );

    const data = await response.json();

    console.log("transactions", data);

    setTransactions(data.data.transactions);
    setIsLoading(false);
    setLoadingLabel("");
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
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
