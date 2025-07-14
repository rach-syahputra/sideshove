"use client";

import { useOnceOffPaymentContext } from "@/context/OnceOffPaymentContext";
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
import OnceOffPaymentRequestWithWebForm from "./OnceOffPaymentRequestWithWebForm";

const OnceOffPaymentRequestCard = () => {
  const { requestMethods, step } = useOnceOffPaymentContext();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold">Single Payment Request</h1>
        <p className="text-sm text-gray-500">Create your payment securely.</p>
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
        ) : step === 2 && requestMethods?.includes("WEB") ? (
          <OnceOffPaymentRequestWithWebForm />
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
