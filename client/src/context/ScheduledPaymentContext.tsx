"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { TransactionRequestMethod } from "@/lib/types/transaction";

interface IScheduledPaymentContext {
  requestMethods: TransactionRequestMethod[] | null;
  setRequestMethods: Dispatch<
    SetStateAction<TransactionRequestMethod[] | null>
  >;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const ScheduledPaymentContext = createContext<
  IScheduledPaymentContext | undefined
>(undefined);

const ScheduledPaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [requestMethods, setRequestMethods] = useState<
    TransactionRequestMethod[] | null
  >(null);
  const [step, setStep] = useState<number>(1);

  return (
    <ScheduledPaymentContext.Provider
      value={{
        requestMethods,
        setRequestMethods,
        step,
        setStep,
      }}
    >
      {children}
    </ScheduledPaymentContext.Provider>
  );
};

const useScheduledPaymentContext = (): IScheduledPaymentContext => {
  const context = useContext(ScheduledPaymentContext);
  if (context === undefined) {
    throw new Error(
      "useScheduledPaymentContext must be used within a ScheduledPaymentProvider",
    );
  }
  return context;
};

export { ScheduledPaymentProvider, useScheduledPaymentContext };
