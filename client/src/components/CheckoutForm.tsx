"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Link from "next/link";

import { Button } from "./ui/button";

interface CheckoutFormProps {
  id: string;
}
const CheckoutForm = ({ id }: CheckoutFormProps) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [integrity, setIntegrity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPaymentForm = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkouts/${id}/payment`
    );

    const data = await response.json();

    if (data?.data?.result?.code !== "000.200.000") {
      return router.push(`/checkout/success?id=${id}`);
    }

    setIntegrity(data.data.integrity);
  };

  useEffect(() => {
    fetchPaymentForm();
  }, []);

  useEffect(() => {
    const form = formRef.current;

    if (form?.innerHTML.trim() !== "") {
      setIsLoading(false);
    }
  }, [formRef]);

  return (
    <div className="max-w-3xl mx-auto flex items-center justify-center flex-col gap-6 py-8">
      <div className="flex text-center flex-col gap-1">
        <h1 className="text-2xl font-bold">Payment Form</h1>
        <p className="text-sm text-gray-500">
          Complete your order with secure checkout.
        </p>
      </div>

      <div>
        <form
          action={process.env.NEXT_PUBLIC_BASE_URL + "/checkout/success"}
          method="post"
          className="paymentWidgets"
          data-brands="VISA MASTER AMEX"
        ></form>
      </div>

      {id && integrity && !isLoading ? (
        <>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">
              You can pay later by visiting transaction history.
            </p>
            <Button asChild>
              <Link href="/orders">View Transaction History</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to Shopping</Link>
            </Button>
          </div>

          <Script
            src={`https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${id}`}
            integrity={integrity}
            crossOrigin="anonymous"
          />
        </>
      ) : (
        <p className="text-sm text-gray-600">Loading your payment...</p>
      )}
    </div>
  );
};

export default CheckoutForm;
