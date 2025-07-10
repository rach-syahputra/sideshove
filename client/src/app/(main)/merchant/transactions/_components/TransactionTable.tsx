"use client";

import { useState } from "react";
import { Ellipsis } from "lucide-react";

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
                  <TableCell>{transaction.email}</TableCell>
                  <TableCell>
                    {transaction.currency} {transaction.amount}
                  </TableCell>
                  <TableCell>
                    {transaction.status === "pending" ? (
                      <span className="uppercase font-medium text-orange-500">
                        ACTIVE
                      </span>
                    ) : transaction.status === "success" ? (
                      <span className="uppercase font-medium text-green-500">
                        {transaction.status}
                      </span>
                    ) : (
                      <span className="uppercase font-medium text-red-500">
                        {transaction.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Ellipsis className="text-muted-foreground place-self-end w-5" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}

      {isLoading && (
        <div className="mx-auto py-8 flex items-center justify-center">
          <LoadingSpinner label="Loading transactions..." />
        </div>
      )}
      {loadingLabel && <DialogAction label={loadingLabel} />}
    </>
  );
};

export default TransactionTable;
