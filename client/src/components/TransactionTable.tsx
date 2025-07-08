"use client";

import { useRouter } from "next/navigation";

import { Payment } from "@/lib/types/transaction";
import { formatDate } from "@/lib/utils";
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
  const router = useRouter();

  const handleCapturePayment = async (paymentId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/${paymentId}?paymentType=CP`,
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
      router.refresh();
    }
  };

  return (
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
              <TableCell>{payment.type ?? ""}</TableCell>
              <TableCell>{formatDate(new Date(payment.createdAt))}</TableCell>
              {payment.type === "PA" ? (
                <TableCell className=" text-right">
                  <Button onClick={() => handleCapturePayment(payment.id)}>
                    Capture
                  </Button>
                </TableCell>
              ) : payment.type === "CP" ? (
                <TableCell className="text-right">
                  <Button
                    onClick={() => {}}
                    variant="destructive"
                    className="text-white"
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
  );
};

export default TransactionTable;
