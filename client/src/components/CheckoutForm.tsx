"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Link from "next/link";

import { Order } from "@/lib/types/order";
import { Button } from "./ui/button";

interface CheckoutFormProps {
  id: string;
}
const CheckoutForm = ({ id }: CheckoutFormProps) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [checkout, setCheckout] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPaymentForm = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkouts/${id}/payment`
    );

    const data = await response.json();
    setCheckout(data.data.checkout);

    if (data.data.result.code !== "000.200.000") {
      return router.push(`/checkout/success?id=${id}`);
    }
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
    <div className="max-w-5xl min-h-svh mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-3 py-8">
      <div className="flex mx-auto flex-col lg:pr-8 w-full items-center justify-start lg:col-span-1 gap-2 max-lg:max-w-96 lg:border-r-[1px] lg:border-gray-200">
        <h2 className="text-2xl font-bold">Transaction Detail</h2>
        <div className="flex w-full my-4 items-center flex-col gap-2">
          <div className="flex w-full items-center justify-between gap-2">
            <span className="text-gray-500 text-sm font-semibold">Amount:</span>
            <span className="font-semibold">{checkout?.amount}</span>
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <span className="text-gray-500 text-sm font-semibold">
              Currency:
            </span>
            <span className="font-semibold">{checkout?.currency}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center">
          You can pay later by visiting transaction history.
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link href="/orders">View Transaction History</Link>
        </Button>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/">Back to Shopping</Link>
        </Button>
      </div>

      <div className="flex flex-col lg:pl-8 items-center justify-start gap-6 lg:col-span-2">
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

        {id && checkout && !isLoading ? (
          <>
            <Script src="https://code.jquery.com/jquery-3.6.0.min.js" />

            <Script id="wpwl-options">
              {`
              var wpwlOptions = {
                style: "plain",
                billingAddress: {
                  country: "US",
                  state: "NY",
                  city: "New York",
                  street1: "111 6th Avenu",
                  street2: "",
                  postcode: "12312"
                },
                forceCardHolderEqualsBillingName: true,
                showCVVHint: true,
                brandDetection: true,
                onReady: function(){ 
                  $(".wpwl-group-cardNumber").after($(".wpwl-group-brand").detach());
                  $(".wpwl-group-cvv").after( $(".wpwl-group-cardHolder").detach());
                  var visa = $(".wpwl-brand:first").clone().removeAttr("class").attr("class", "wpwl-brand-card wpwl-brand-custom wpwl-brand-VISA")
                  var master = $(visa).clone().removeClass("wpwl-brand-VISA").addClass("wpwl-brand-MASTER");
                  $(".wpwl-brand:first").after( $(master)).after( $(visa));
                  var imageUrl = "https://eu-test.oppwa.com/v1/static/" + wpwl.cacheVersion + "/img/brand.png";
                  $(".wpwl-brand-custom").css("background-image", "url(" + imageUrl + ")");
                  $(".wpwl-button").css("width", "100%");
                  $(".wpwl-button-pay").css("border-radius", "8px");
                  $(".wpwl-button-pay").css("background-color", "oklch(0.205 0 0)");
                  $(".wpwl-button-pay").css("border-color", "oklch(0.205 0 0)");
                },
                onChangeBrand: function(e){
                  $(".wpwl-brand-custom").css("opacity", "0.3");
                  $(".wpwl-brand-" + e).css("opacity", "1"); 
                }
              }
            `}
            </Script>
            <Script
              src={`https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${id}`}
              integrity={checkout.integrity}
              crossOrigin="anonymous"
            />
          </>
        ) : (
          <p className="text-sm text-gray-600">Loading your payment...</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
