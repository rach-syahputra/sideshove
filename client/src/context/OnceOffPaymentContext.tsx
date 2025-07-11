"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PaymentMethodFormType = "SMS" | "EMAIL" | "SMS_EMAIL" | "LINK";

interface IOnceOffPaymentContext {
  paymentMethod: PaymentMethodFormType | null;
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethodFormType | null>>;
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
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodFormType | null>(null);
  const [step, setStep] = useState<number>(1);

  return (
    <OnceOffPaymentContext.Provider
      value={{
        paymentMethod,
        setPaymentMethod,
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
