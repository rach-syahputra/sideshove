"use client";

import { useEffect, useState } from "react";

import { Payment } from "@/lib/types/transaction";
import { TRANSACTION_TYPE_LABELS } from "@/lib/constants/transaction";
import { usePaymentDetailContext } from "@/context/PaymentDetailContext";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";

interface PaymentDetailProps {
  paymentId: string;
}

const PaymentDetail = ({ paymentId }: PaymentDetailProps) => {
  const { isLoading, activePaymentIds, activePayments } =
    usePaymentDetailContext();
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    if (activePayments.length > 0) {
      const matchPayment = activePayments.find(
        (activePayment) => activePayment.payment_id === paymentId,
      );

      if (matchPayment) {
        setPayment(matchPayment);
      }
    }
  }, [activePayments, paymentId]);

  return (
    <Collapsible
      open={activePaymentIds.includes(paymentId)}
      className="mb-4 flex w-full flex-col gap-2"
    >
      <CollapsibleContent className="text-wrap">
        <Card className="flex min-h-[88px] w-full flex-col gap-2 rounded-md p-2">
          {isLoading && !payment ? (
            <div className="flex min-h-[60px] w-full items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : !isLoading && !payment ? (
            <p>Unable to rececive payment detail</p>
          ) : (
            <>
              <h4 className="w-full rounded-xs bg-gray-200 px-2 py-1 text-sm font-medium text-gray-600">
                PAYMENT DETAIL
              </h4>
              <div className="grid grid-cols-3 gap-4 px-2">
                {payment?.reference_payment_id && (
                  <div className="flex flex-col gap-0.5 text-xs">
                    <h5 className="text-gray-400">Reference Unique ID</h5>
                    <span className="font-medium">
                      {payment?.reference_payment_id}
                    </span>
                  </div>
                )}

                {payment?.transaction_type && (
                  <div className="flex flex-col gap-0.5 text-xs">
                    <h5 className="text-gray-400">Transaction Type</h5>
                    <span className="font-medium">
                      {TRANSACTION_TYPE_LABELS[payment?.transaction_type]}
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-0.5 text-xs">
                  <h5 className="text-gray-400">Result Description</h5>
                  <span className="font-medium">
                    {payment?.result_description}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 text-xs">
                  <h5 className="text-gray-400">Total Amount</h5>
                  <span className="font-medium">
                    {payment?.currency} {payment?.amount}
                  </span>
                </div>
              </div>
            </>
          )}
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PaymentDetail;
