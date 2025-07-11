"use client";

import { useOnceOffEditPaymentContext } from "@/context/OnceOffEditPaymentContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import OnceOffPaymentRequestWithEmailForm from "./OnceOffPaymentRequestWithEmailForm";
import NextButton from "./NextButton";
import PaymentMethodList from "./PaymentMethodList";
import OnceOffPaymentRequestWithSMSForm from "./OnceOffPaymentRequestWithSMSForm";
import OnceOffPaymentRequestWithSMSAndEmailForm from "./OnceOffPaymentRequestWithSMSAndEmailForm";

const OnceOffPaymentRequestCard = () => {
  const { requestMethods, step } = useOnceOffEditPaymentContext();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold">Edit Single Transaction</h1>
        <p className="text-sm text-gray-500">Update your payment securely.</p>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <PaymentMethodList />
        ) : step === 2 &&
          requestMethods?.includes("EMAIL") &&
          requestMethods.includes("SMS") ? (
          <OnceOffPaymentRequestWithSMSAndEmailForm />
        ) : step === 2 && requestMethods?.includes("EMAIL") ? (
          <OnceOffPaymentRequestWithEmailForm />
        ) : step === 2 && requestMethods?.includes("SMS") ? (
          <OnceOffPaymentRequestWithSMSForm />
        ) : (
          ""
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <NextButton />
      </CardFooter>
    </Card>
  );
};

export default OnceOffPaymentRequestCard;
