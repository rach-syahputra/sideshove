"use client";

import { Fragment, useState } from "react";
import { ChevronRight } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";
import { useTransactionContext } from "@/context/TransactionContext";
import { useTransactionDetailContext } from "@/context/TransactionDetailContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogAction from "@/components/DialogAction";
import LoadingSpinner from "@/components/LoadingSpinner";
import PaymentDetail from "@/app/(main)/merchant/transactions/_components/TransactionDetail";
import PaymentTypeDialog from "./PaymentTypeDialog";
import ActionDialog from "./ActionDialog";
import CustomerDialog from "./CustomerDialog";

const TransactionTable = () => {
  const { transactions, isLoading } = useTransactionContext();
  const {
    activeTransactionIds,
    setActiveTransactionIds,
    updateActiveTransactions,
  } = useTransactionDetailContext();
  const [loadingLabel] = useState<string>("");

  const handleClickDetail = (transactionId: string) => {
    // if a transaction detail of a specific row is already active, hide it
    // else, fetch new transaction detail
    const matchTransactionId = activeTransactionIds.find(
      (activeTransactionId) => activeTransactionId === transactionId,
    );

    if (matchTransactionId) {
      setActiveTransactionIds((prev) =>
        prev.filter((id) => id !== transactionId),
      );
      updateActiveTransactions(transactionId);
    } else {
      setActiveTransactionIds((prev) => [...prev, transactionId]);
      updateActiveTransactions(transactionId);
    }
  };

  return (
    <>
      {transactions?.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Ref. Number</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Detail</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.length > 0 &&
              transactions.map((transaction, index) => {
                const isDetailActive = activeTransactionIds.includes(
                  transaction.transaction_id,
                );

                return (
                  <Fragment key={index}>
                    <TableRow
                      className={`${isDetailActive ? "bg-gray-100" : ""}`}
                    >
                      <TableCell>
                        {formatDate(new Date(transaction.created_at))}
                      </TableCell>
                      <TableCell>{transaction.reference_number}</TableCell>
                      <TableCell>
                        <PaymentTypeDialog
                          label={
                            transaction.payment_frequency === "ONE-TIME"
                              ? "Single"
                              : "Recurring"
                          }
                          url={transaction.url}
                        />
                      </TableCell>
                      <TableCell className="w-[300px]">
                        <CustomerDialog
                          email={transaction.email}
                          mobileNumber={transaction.mobile_number}
                        />
                      </TableCell>
                      <TableCell>
                        {transaction.currency} {transaction.amount}
                      </TableCell>
                      <TableCell>
                        {transaction.status === "pending" ? (
                          <span className="font-medium text-orange-500 uppercase">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="font-medium text-green-500 uppercase">
                            SUCCESS
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <ChevronRight
                          onClick={() =>
                            handleClickDetail(transaction.transaction_id)
                          }
                          className={cn(
                            "w-5 cursor-pointer transition-all duration-300 ease-in-out select-none",
                            {
                              "rotate-90": isDetailActive,
                            },
                          )}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <ActionDialog
                          transactionId={transaction.transaction_id}
                          status={transaction.status}
                        />
                      </TableCell>
                    </TableRow>

                    {isDetailActive && (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <PaymentDetail
                            transactionId={transaction.transaction_id}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
          </TableBody>
        </Table>
      )}

      {isLoading && (
        <div className="mx-auto flex items-center justify-center py-8">
          <LoadingSpinner label="Loading transactions..." />
        </div>
      )}
      {loadingLabel && <DialogAction label={loadingLabel} />}
    </>
  );
};

export default TransactionTable;
