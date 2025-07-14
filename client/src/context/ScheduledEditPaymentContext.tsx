"use client";

import { Transaction, TransactionRequestMethod } from "@/lib/types/transaction";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IScheduledEditPaymentContext {
  requestMethods: TransactionRequestMethod[] | null;
  setRequestMethods: Dispatch<
    SetStateAction<TransactionRequestMethod[] | null>
  >;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  transaction: Transaction;
}

interface ScheduledEditPaymentProviderProps {
  children: ReactNode;
  transaction: Transaction;
}

const ScheduledEditPaymentContext = createContext<
  IScheduledEditPaymentContext | undefined
>(undefined);

const ScheduledEditPaymentProvider = ({
  children,
  transaction,
}: ScheduledEditPaymentProviderProps) => {
  const [requestMethods, setRequestMethods] = useState<
    TransactionRequestMethod[] | null
  >(null);
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    setRequestMethods(transaction.request_methods);
  }, [transaction]);

  return (
    <ScheduledEditPaymentContext.Provider
      value={{
        requestMethods,
        setRequestMethods,
        step,
        setStep,
        transaction,
      }}
    >
      {children}
    </ScheduledEditPaymentContext.Provider>
  );
};

const useScheduledEditPaymentContext = (): IScheduledEditPaymentContext => {
  const context = useContext(ScheduledEditPaymentContext);
  if (context === undefined) {
    throw new Error(
      "useScheduledEditPaymentContext must be used within a ScheduledEditPaymentProvider",
    );
  }
  return context;
};

export { ScheduledEditPaymentProvider, useScheduledEditPaymentContext };
