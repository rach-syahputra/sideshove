"use client";

import { Mail, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";
import { useOnceOffPaymentContext } from "@/context/OnceOffPaymentContext";
import { Card } from "@/components/ui/card";

const PaymentMethodList = () => {
  const { paymentMethod, setPaymentMethod } = useOnceOffPaymentContext();
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card
        onClick={() => setPaymentMethod("SMS")}
        className={cn("group cursor-pointer", {
          "border-primary": paymentMethod === "SMS",
        })}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-1 text-gray-400 transition-all duration-150 ease-in-out group-hover:text-gray-600",
            {
              "text-primary": paymentMethod === "SMS",
            },
          )}
        >
          <div className="h-16">
            <Smartphone size={64} strokeWidth={1} />
          </div>
          <span className="font-semibold">SMS</span>
        </div>
      </Card>

      <Card
        onClick={() => setPaymentMethod("EMAIL")}
        className={cn("group cursor-pointer", {
          "border-primary": paymentMethod === "EMAIL",
        })}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-1 text-gray-400 transition-all duration-150 ease-in-out group-hover:text-gray-600",
            {
              "text-primary": paymentMethod === "EMAIL",
            },
          )}
        >
          <div className="h-16">
            <Mail size={64} strokeWidth={1} />
          </div>
          <span className="font-semibold">Email</span>
        </div>
      </Card>

      <Card
        onClick={() => setPaymentMethod("SMS_EMAIL")}
        className={cn("group cursor-pointer", {
          "border-primary": paymentMethod === "SMS_EMAIL",
        })}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-1 text-gray-400 transition-all duration-150 ease-in-out group-hover:text-gray-600",
            {
              "text-primary": paymentMethod === "SMS_EMAIL",
            },
          )}
        >
          <div className="flex h-16 items-center justify-center gap-0.5">
            <Smartphone size={56} strokeWidth={1} />
            <Mail size={56} strokeWidth={1} />
          </div>
          <span className="font-semibold">SMS & Email</span>
        </div>
      </Card>

      {/* <Card
          onClick={() => setPaymentMethod("LINK")}
          className={cn("group cursor-pointer", {
            "border-primary": paymentMethod === "LINK",
          })}
        >
          <div
            className={cn(
              "flex flex-col items-center gap-1 justify-between text-gray-400 group-hover:text-gray-600 transition-all duration-150 ease-in-out",
              {
                "text-primary": paymentMethod === "LINK",
              }
            )}
          >
            <div className="h-16">
              <Link size={58} strokeWidth={1} />
            </div>
            <span className="font-semibold">Create a Web Link</span>
          </div>
        </Card> */}
    </div>
  );
};

export default PaymentMethodList;
