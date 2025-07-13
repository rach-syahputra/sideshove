"use client";

import { useEffect, useState } from "react";

import { Transaction } from "@/lib/types/transaction";
import { PAYMENT_TYPE_LABELS } from "@/lib/constants/transaction";
import { formatTransactionDetailDate, getRequestMethods } from "@/lib/utils";
import { useTransactionDetailContext } from "@/context/TransactionDetailContext";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";

interface TransactionDetailProps {
  transactionId: string;
}

const TransactionDetail = ({ transactionId }: TransactionDetailProps) => {
  const { isLoading, activeTransactionIds, activeTransactions } =
    useTransactionDetailContext();
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

  return (
    <Collapsible
      open={activeTransactionIds.includes(transactionId)}
      className="mb-4 flex w-full flex-col gap-2"
    >
      <CollapsibleContent className="text-wrap">
        <Card className="flex min-h-[88px] w-full flex-col gap-2 rounded-md p-2">
          {isLoading && !transaction ? (
            <div className="flex min-h-[60px] w-full items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
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

export default TransactionDetail;
