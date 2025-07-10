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
import PaymentTypeDialog from "./PaymentTypeDialog";

const TransactionTable = () => {
  const { transactions } = useTransactionContext();
  const [loadingLabel] = useState<string>("");

  return (
    <>
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
                <TableCell>{transaction.status}</TableCell>
                <TableCell className="text-right">
                  <Ellipsis className="cursor-pointer place-self-end w-5" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {loadingLabel && <DialogAction label={loadingLabel} />}
    </>
  );
};

export default TransactionTable;
