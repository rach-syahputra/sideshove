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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        : "Creating payment..."
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments`
    );

    const data = await response.json();

    console.log("Payments", data);

    setPayments(data.data.payments);
    setIsLoading(false);
    setLoadingLabel("");
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        payments,
        setPayments,
        isLoading,
        setIsLoading,
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
