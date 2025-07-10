import { ReactNode } from "react";
import { OnceOffPaymentProvider } from "@/context/OnceOffPaymentContext";

const OnceOffPaymentRequestLayout = ({ children }: { children: ReactNode }) => {
  return <OnceOffPaymentProvider>{children}</OnceOffPaymentProvider>;
};

export default OnceOffPaymentRequestLayout;
