"use client";

import { useScheduledEditPaymentContext } from "@/context/ScheduledEditPaymentContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import NextButton from "./NextButton";
import PaymentMethodList from "./PaymentMethodList";
import ScheduledPaymentRequestWithSMSAndEmailForm from "./ScheduledPaymentRequestWithSMSAndEmailForm";
import ScheduledPaymentRequestWithEmailForm from "./ScheduledPaymentRequestWithEmailForm";
import ScheduledPaymentRequestWithSMSForm from "./ScheduledPaymentRequestWithSMSForm";
import ScheduledPaymentRequestWithWebForm from "./ScheduledPaymentRequestWithWebForm";

const ScheduledPaymentRequestCard = () => {
  const { requestMethods, step } = useScheduledEditPaymentContext();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold">Recurring Payment Request</h1>
        <p className="text-sm text-gray-500">Create your payment securely.</p>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <PaymentMethodList />
        ) : step === 2 &&
          requestMethods?.includes("EMAIL") &&
          requestMethods.includes("SMS") ? (
          <ScheduledPaymentRequestWithSMSAndEmailForm />
        ) : step === 2 && requestMethods?.includes("EMAIL") ? (
          <ScheduledPaymentRequestWithEmailForm />
        ) : step === 2 && requestMethods?.includes("SMS") ? (
          <ScheduledPaymentRequestWithSMSForm />
        ) : step === 2 && requestMethods?.includes("WEB") ? (
          <ScheduledPaymentRequestWithWebForm />
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

export default ScheduledPaymentRequestCard;
