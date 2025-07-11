"use client";

import { ChevronLeft } from "lucide-react";

import { useOnceOffEditPaymentContext } from "@/context/OnceOffEditPaymentContext";

const PreviousButton = () => {
  const { step, setStep } = useOnceOffEditPaymentContext();

  return step > 1 ? (
    <div
      onClick={() => setStep((prev) => prev - 1)}
      className="border-primary cursor-pointer rounded-md border px-4 py-2"
    >
      <ChevronLeft size={24} />
    </div>
  ) : null;
};

export default PreviousButton;
