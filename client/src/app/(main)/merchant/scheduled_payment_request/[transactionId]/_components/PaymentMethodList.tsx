"use client";

import { Link, Mail, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";
import { useScheduledEditPaymentContext } from "@/context/ScheduledEditPaymentContext";
import { Card } from "@/components/ui/card";

const PaymentMethodList = () => {
  const { requestMethods } = useScheduledEditPaymentContext();

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card
        className={cn("group cursor-pointer", {
          "border-primary": requestMethods?.every((method) => method === "SMS"),
        })}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-1 text-gray-400",
            {
              "text-primary": requestMethods?.every(
                (method) => method === "SMS",
              ),
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
        className={cn("group cursor-pointer", {
          "border-primary": requestMethods?.every(
            (method) => method === "EMAIL",
          ),
        })}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-1 text-gray-400",
            {
              "text-primary": requestMethods?.every(
                (method) => method === "EMAIL",
              ),
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
        className={cn("group cursor-pointer", {
          "border-primary":
            requestMethods?.includes("SMS") &&
            requestMethods?.includes("EMAIL"),
        })}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-1 text-gray-400",
            {
              "text-primary":
                requestMethods?.includes("SMS") &&
                requestMethods?.includes("EMAIL"),
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

      <Card
        className={cn("group cursor-pointer", {
          "border-primary": requestMethods?.every((method) => method === "WEB"),
        })}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-1 text-gray-400",
            {
              "text-primary": requestMethods?.every(
                (method) => method === "WEB",
              ),
            },
          )}
        >
          <div className="h-16">
            <Link size={50} strokeWidth={1} />
          </div>
          <span className="font-semibold">Email</span>
        </div>
      </Card>
    </div>
  );
};

export default PaymentMethodList;
