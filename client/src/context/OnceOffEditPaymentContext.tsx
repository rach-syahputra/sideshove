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

interface IOnceOffEditPaymentContext {
  requestMethods: TransactionRequestMethod[] | null;
  setRequestMethods: Dispatch<
    SetStateAction<TransactionRequestMethod[] | null>
  >;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  transaction: Transaction;
}

interface OnceOffEditPaymentProviderProps {
  children: ReactNode;
  transaction: Transaction;
}

const OnceOffEditPaymentContext = createContext<
  IOnceOffEditPaymentContext | undefined
>(undefined);

const OnceOffEditPaymentProvider = ({
  children,
  transaction,
}: OnceOffEditPaymentProviderProps) => {
  const [requestMethods, setRequestMethods] = useState<
    TransactionRequestMethod[] | null
  >(null);
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    setRequestMethods(transaction.request_methods);
  }, [transaction]);

  return (
    <OnceOffEditPaymentContext.Provider
      value={{
        requestMethods,
        setRequestMethods,
        step,
        setStep,
        transaction,
      }}
    >
      {children}
    </OnceOffEditPaymentContext.Provider>
  );
};

const useOnceOffEditPaymentContext = (): IOnceOffEditPaymentContext => {
  const context = useContext(OnceOffEditPaymentContext);
  if (context === undefined) {
    throw new Error(
      "useOnceOffEditPaymentContext must be used within a OnceOffEditPaymentProvider",
    );
  }
  return context;
};

export { OnceOffEditPaymentProvider, useOnceOffEditPaymentContext };
