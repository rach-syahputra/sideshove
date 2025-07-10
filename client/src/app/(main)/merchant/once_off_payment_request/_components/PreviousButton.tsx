"use client";

import { ChevronLeft } from "lucide-react";

import { useOnceOffPaymentContext } from "@/context/OnceOffPaymentContext";

const PreviousButton = () => {
  const { step, setStep } = useOnceOffPaymentContext();

  return step > 1 ? (
    <div
      onClick={() => setStep((prev) => prev - 1)}
      className="border border-primary px-4 py-2 rounded-md cursor-pointer"
    >
      <ChevronLeft size={24} />
    </div>
  ) : null;
};

export default PreviousButton;
