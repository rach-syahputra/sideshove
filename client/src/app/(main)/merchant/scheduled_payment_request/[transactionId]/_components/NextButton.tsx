"use client";

import { ChevronRight } from "lucide-react";

import { useScheduledEditPaymentContext } from "@/context/ScheduledEditPaymentContext";

const NextButton = () => {
  const { requestMethods, step, setStep } = useScheduledEditPaymentContext();

  return requestMethods === null && step === 1 ? (
    <div className="bg-primary/60 rounded-md px-4 py-2">
      <ChevronRight size={24} className="text-white" />
    </div>
  ) : requestMethods !== null && step === 1 ? (
    <div
      onClick={() => setStep((prev) => prev + 1)}
      className="bg-primary cursor-pointer rounded-md px-4 py-2"
    >
      <ChevronRight size={24} className="text-white" />
    </div>
  ) : null;
};

export default NextButton;
