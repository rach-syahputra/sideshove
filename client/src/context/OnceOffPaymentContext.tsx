"use client";

import { TransactionRequestMethod } from "@/lib/types/transaction";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IOnceOffPaymentContext {
  requestMethods: TransactionRequestMethod[] | null;
  setRequestMethods: Dispatch<
    SetStateAction<TransactionRequestMethod[] | null>
  >;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const OnceOffPaymentContext = createContext<IOnceOffPaymentContext | undefined>(
  undefined,
);

const OnceOffPaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [requestMethods, setRequestMethods] = useState<
    TransactionRequestMethod[] | null
  >(null);
  const [step, setStep] = useState<number>(1);

  return (
    <OnceOffPaymentContext.Provider
      value={{
        requestMethods,
        setRequestMethods,
        step,
        setStep,
      }}
    >
      {children}
    </OnceOffPaymentContext.Provider>
  );
};

const useOnceOffPaymentContext = (): IOnceOffPaymentContext => {
  const context = useContext(OnceOffPaymentContext);
  if (context === undefined) {
    throw new Error(
      "useOnceOffPaymentContext must be used within a OnceOffPaymentProvider",
    );
  }
  return context;
};

export { OnceOffPaymentProvider, useOnceOffPaymentContext };
