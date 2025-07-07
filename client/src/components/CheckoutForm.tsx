"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { PRODUCTS } from "@/lib/products";

interface CheckoutFormProps {
  productSlug: string;
}

const CheckoutForm = ({ productSlug }: CheckoutFormProps) => {
  const [checkoutId, setCheckoutId] = useState<string>("");
  const [integrity, setIntegrity] = useState<string>("");

  useEffect(() => {
    const fetchPaymentForm = async () => {
      const product = PRODUCTS.find((product) => product.slug === productSlug)!;

      if (product) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkouts`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              amount: product.price || 0,
            }),
          }
        );

        const data = await response.json();

        console.log("checkout data", data);

        if (data) {
          setCheckoutId(data.data.id);
          setIntegrity(data.data.integrity);
        }
      }
    };

    fetchPaymentForm();
  }, []);

  if (!checkoutId || !integrity)
    return (
      <div className="w-screen min-h-svh flex items-center justify-center">
        <div className="flex items-center justce gap-4">
          <div className="w-4 h-4 border-2 border-gray-500 animate-spin"></div>
          <p>Generating your payment</p>
        </div>
      </div>
    );

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
          className="paymentWidgets"
          data-brands="VISA MASTER AMEX"
        ></form>
      </div>

      {checkoutId && integrity && (
        <Script
          src={`https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`}
          integrity={integrity}
          crossOrigin="anonymous"
        />
      )}
    </div>
  );
};

export default CheckoutForm;
