"use client";

import { Payment } from "@/lib/types/transaction";
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
import { Button } from "./ui/button";

interface TransactionTableProps {
  payments: Payment[];
}

const TransactionTable = ({ payments }: TransactionTableProps) => {
  const { fetchTransactions } = useTransactionContext();

  const handleCapturePayment = async (paymentId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/${paymentId}?type=CP`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          amount: 110,
        }),
      }
    );

    const data = await response.json();

    if (data.data.result.code === "000.100.110") {
      fetchTransactions();
    }
  };

  const handleRefundPayment = async (paymentId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/${paymentId}?type=RF`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          amount: 110,
        }),
      }
    );

    const data = await response.json();

    if (data.data.result.code === "000.100.110") {
      fetchTransactions();
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.length > 0 &&
            payments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell className="text-xs">{payment.id}</TableCell>
                <TableCell>{payment.brand ?? ""}</TableCell>
                <TableCell>{payment.amount ?? ""}</TableCell>
                <TableCell>
                  {payment.type === "PA" ? (
                    <span className="px-2 py-1 font-medium rounded-md bg-amber-400">
                      PRE-AUTHORIZE
                    </span>
                  ) : payment.type === "CP" ? (
                    <span className="px-2 py-1 font-medium rounded-md bg-green-400">
                      CAPTURE
                    </span>
                  ) : payment.type === "RF" ? (
                    <span className="px-2 py-1 font-medium rounded-md bg-red-400">
                      REFUND
                    </span>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>{formatDate(new Date(payment.createdAt))}</TableCell>
                {payment.type === "PA" && payment.status !== "CAPTURED" ? (
                  <TableCell className=" text-right">
                    <Button
                      onClick={() => handleCapturePayment(payment.id)}
                      className="h-9"
                    >
                      Capture
                    </Button>
                  </TableCell>
                ) : payment.type === "CP" && payment.status !== "REFUNDED" ? (
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleRefundPayment(payment.id)}
                      variant="destructive"
                      className="text-white h-9 "
                    >
                      Refund
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell className="text-muted-foreground text-right">
                    No Action
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionTable;
