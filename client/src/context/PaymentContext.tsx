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

interface IPaymentContext {
  payments: Payment[];
  setPayments: Dispatch<SetStateAction<Payment[]>>;
  isLoading: boolean;
  hasMore: boolean;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  loadingLabel: string;
  setLoadingLabel: Dispatch<SetStateAction<string>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  fetchPayments: () => void;
}

const PaymentContext = createContext<IPaymentContext | undefined>(undefined);

const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [type, setType] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingLabel, setLoadingLabel] = useState<string>("");

  const fetchPayments = async () => {
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments?page=${page}`,
    );

    const data = await response.json();

    console.log("Payments", data);

    if (data.data?.payments?.length > 0) {
      setPayments((prev) => [...prev, ...data.data.payments]);

      if (page < data.data?.page_count) {
        setPage((prev) => prev + 1);
      }
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
    setLoadingLabel("");
  };

  useEffect(() => {
    fetchPayments();
  }, [page]);

  return (
    <PaymentContext.Provider
      value={{
        payments,
        setPayments,
        isLoading,
        setIsLoading,
        hasMore,
        setHasMore,
        loadingLabel,
        setLoadingLabel,
        type,
        setType,
        fetchPayments,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

const usePaymentContext = (): IPaymentContext => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
};

export { PaymentProvider, usePaymentContext };
