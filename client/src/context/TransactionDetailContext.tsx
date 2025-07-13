"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { fetchTransactionDetail } from "@/lib/apis/transaction";
import { Transaction } from "@/lib/types/transaction";

interface ITransactionDetailContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  activeTransactionIds: string[];
  setActiveTransactionIds: Dispatch<SetStateAction<string[]>>;
  activeTransactions: Transaction[];
  setActiveTransactions: Dispatch<SetStateAction<Transaction[]>>;
  updateActiveTransactions: (transactionId: string) => void;
}

const TransactionDetailContext = createContext<
  ITransactionDetailContext | undefined
>(undefined);

const TransactionDetailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTransactionIds, setActiveTransactionIds] = useState<string[]>(
    [],
  );
  const [activeTransactions, setActiveTransactions] = useState<Transaction[]>(
    [],
  );

  const updateActiveTransactions = async (transactionId: string) => {
    // if active transaction already exist, remove it from activeTransactions
    // else add it to activeTransactions
    setIsLoading(true);

    const existActiveTransactionid = activeTransactionIds.find(
      (activeTransactionId) => activeTransactionId === transactionId,
    );

    if (!existActiveTransactionid) {
      const response = await fetchTransactionDetail(transactionId);

      if (response?.data?.transaction) {
        setActiveTransactions((prev) => [...prev, response.data.transaction]);
      }
    } else {
      setActiveTransactions(
        activeTransactions.filter(
          (activeTransaction) =>
            activeTransaction.transaction_id !== transactionId,
        ),
      );
    }

    setIsLoading(false);
  };

  return (
    <TransactionDetailContext.Provider
      value={{
        activeTransactionIds,
        setActiveTransactionIds,
        isOpen,
        setIsOpen,
        isLoading,
        setIsLoading,
        activeTransactions,
        setActiveTransactions,
        updateActiveTransactions,
      }}
    >
      {children}
    </TransactionDetailContext.Provider>
  );
};

const useTransactionDetailContext = (): ITransactionDetailContext => {
  const context = useContext(TransactionDetailContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionDetailContext must be used within a TransactionDetailProvider",
    );
  }
  return context;
};

export { TransactionDetailProvider, useTransactionDetailContext };
