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
  hasMore: boolean;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  loadingLabel: string;
  setLoadingLabel: Dispatch<SetStateAction<string>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  fetchTransactions: () => void;
}

const TransactionContext = createContext<ITransactionContext | undefined>(
  undefined,
);

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [type, setType] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
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
            : "Creating payment...",
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions?page=${page}`,
    );

    const data = await response.json();

    console.log("transactions", data);

    if (data.data?.transactions?.length > 0) {
      setTransactions((prev) => [...prev, ...data.data.transactions]);

      if (page < data.data?.page_count) {
        setPage((prev) => prev + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
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
        hasMore,
        setHasMore,
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
      "useTransactionContext must be used within a TransactionProvider",
    );
  }
  return context;
};

export { TransactionProvider, useTransactionContext };
