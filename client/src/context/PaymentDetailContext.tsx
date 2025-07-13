"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { Payment } from "@/lib/types/transaction";
import { fetchPaymentDetail } from "@/lib/apis/payment";

interface IPaymentDetailContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  activePaymentIds: string[];
  setActivePaymentIds: Dispatch<SetStateAction<string[]>>;
  activePayments: Payment[];
  setActivePayments: Dispatch<SetStateAction<Payment[]>>;
  updateActivePayments: (paymentId: string) => void;
}

const PaymentDetailContext = createContext<IPaymentDetailContext | undefined>(
  undefined,
);

const PaymentDetailProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePaymentIds, setActivePaymentIds] = useState<string[]>([]);
  const [activePayments, setActivePayments] = useState<Payment[]>([]);

  const updateActivePayments = async (paymentId: string) => {
    // if active payment already exist, remove it from activePayments
    // else add it to activeTransactions
    setIsLoading(true);

    const existActivePaymentId = activePaymentIds.find(
      (activePaymentId) => activePaymentId === paymentId,
    );

    if (!existActivePaymentId) {
      const response = await fetchPaymentDetail(paymentId);

      if (response?.data?.payment) {
        setActivePayments((prev) => [...prev, response.data.payment]);
      }
    } else {
      setActivePayments(
        activePayments.filter(
          (activePayment) => activePayment.payment_id !== paymentId,
        ),
      );
    }

    setIsLoading(false);
  };

  return (
    <PaymentDetailContext.Provider
      value={{
        activePaymentIds,
        setActivePaymentIds,
        isOpen,
        setIsOpen,
        isLoading,
        setIsLoading,
        activePayments,
        setActivePayments,
        updateActivePayments,
      }}
    >
      {children}
    </PaymentDetailContext.Provider>
  );
};

const usePaymentDetailContext = (): IPaymentDetailContext => {
  const context = useContext(PaymentDetailContext);
  if (context === undefined) {
    throw new Error(
      "usePaymentDetailContext must be used within a PaymentDetailProvider",
    );
  }
  return context;
};

export { PaymentDetailProvider, usePaymentDetailContext };
