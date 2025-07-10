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

const OnceOffPaymentRequestCard = () => {
  const { paymentMethod, step } = useOnceOffPaymentContext();

  return (
    <Card>
      <CardHeader className="flex text-center flex-col gap-1">
        <h1 className="text-2xl font-bold">Single Payment Request</h1>
        <p className="text-sm text-gray-500">Create your payment securely.</p>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <PaymentMethodList />
        ) : step === 2 && paymentMethod === "SMS" ? (
          <OnceOffPaymentRequestWithSMSForm />
        ) : step === 2 && paymentMethod === "EMAIL" ? (
          <OnceOffPaymentRequestWithEmailForm />
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
