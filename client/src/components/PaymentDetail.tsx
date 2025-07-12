"use client";

import { useEffect, useState } from "react";

import { Transaction } from "@/lib/types/transaction";
import { PAYMENT_TYPE_LABELS } from "@/lib/constants/transaction";
import { formatTransactionDetailDate, getRequestMethods } from "@/lib/utils";
import { usePaymentDetailContext } from "@/context/PaymentDetailContext";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Card } from "./ui/card";
import LoadingSpinner from "./LoadingSpinner";

interface PaymentDetailProps {
  transactionId: string;
}

const PaymentDetail = ({ transactionId }: PaymentDetailProps) => {
  const { isLoading, activeTransactionIds, activeTransactions } =
    usePaymentDetailContext();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    if (activeTransactions.length > 0) {
      const matchTransaction = activeTransactions.find(
        (activeTransaction) =>
          activeTransaction.transaction_id === transactionId,
      );

      if (matchTransaction) {
        setTransaction(matchTransaction);
      }
    }
  }, [activeTransactions, transactionId]);

  useEffect(() => {
    console.log("transaction", transaction);
  }, [transaction]);

  return (
    <Collapsible
      open={activeTransactionIds.includes(transactionId)}
      className="mb-4 flex w-full flex-col gap-2"
    >
      <CollapsibleContent className="text-wrap">
        <Card className="gap-2 rounded-md p-2">
          {isLoading && !transaction ? (
            <LoadingSpinner size="lg" />
          ) : !isLoading && !transaction ? (
            <p>Unable to rececive transaction detail</p>
          ) : (
            <>
              <h4 className="w-full rounded-xs bg-gray-200 px-2 py-1 text-sm font-medium text-gray-600">
                REQUEST DETAIL
              </h4>
              <div className="grid grid-cols-6 px-2">
                <div className="flex flex-col gap-0.5 text-xs">
                  <h5 className="text-gray-400">Message Service</h5>
                  <span className="font-medium">
                    {getRequestMethods(transaction?.request_methods || [])}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 text-xs">
                  <h5 className="text-gray-400">Created Date</h5>
                  <span className="font-medium">
                    {transaction?.created_at
                      ? formatTransactionDetailDate(
                          new Date(transaction?.created_at),
                        )
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 text-xs">
                  <h5 className="text-gray-400">Expiration Date</h5>
                  <span className="font-medium">
                    {transaction?.expiration_date
                      ? formatTransactionDetailDate(
                          new Date(transaction?.expiration_date),
                        )
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 text-xs">
                  <h5 className="text-gray-400">Payment Type</h5>
                  <span className="font-medium">
                    {transaction?.payment_type
                      ? PAYMENT_TYPE_LABELS[transaction.payment_type]
                      : "-"}
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
