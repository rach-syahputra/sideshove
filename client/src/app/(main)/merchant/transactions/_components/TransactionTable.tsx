"use client";

import { useState } from "react";

import { formatDate } from "@/lib/utils";
import { useTransactionContext } from "@/context/TransactionContext";
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
import PaymentTypeDialog from "./PaymentTypeDialog";
import ActionDialog from "./ActionDialog";
import CustomerDialog from "./CustomerDialog";

const TransactionTable = () => {
  const { transactions, isLoading } = useTransactionContext();
  const [loadingLabel] = useState<string>("");

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
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.length > 0 &&
              transactions.map((transaction, index) => (
                <TableRow key={index}>
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
                    ) : transaction.status === "success" ? (
                      <span className="font-medium text-green-500 uppercase">
                        {transaction.status}
                      </span>
                    ) : (
                      <span className="font-medium text-red-500 uppercase">
                        {transaction.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionDialog
                      transactionId={transaction.transaction_id}
                      status={transaction.status}
                    />
                  </TableCell>
                </TableRow>
              ))}
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
