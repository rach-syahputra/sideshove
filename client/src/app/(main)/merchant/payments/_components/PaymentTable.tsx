"use client";

import { useState } from "react";
import { Ellipsis } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { usePaymentContext } from "@/context/PaymentContext";
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

const PaymentTable = () => {
  const { payments, isLoading } = usePaymentContext();
  const [loadingLabel] = useState<string>("");

  return (
    <>
      {payments?.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Unique ID</TableHead>
              <TableHead>Ref. Number</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.length > 0 &&
              payments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {formatDate(new Date(payment.payment_date))}
                  </TableCell>
                  <TableCell>{payment.payment_id}</TableCell>
                  <TableCell>{payment.reference_number}</TableCell>

                  <TableCell>{payment.payment_type}</TableCell>
                  <TableCell>
                    {payment.currency} {payment.amount}
                  </TableCell>
                  <TableCell>
                    {payment.status === "pending" ? (
                      <span className="uppercase font-medium text-orange-500">
                        ACTIVE
                      </span>
                    ) : payment.status === "success" ? (
                      <span className="uppercase font-medium text-green-500">
                        {payment.status}
                      </span>
                    ) : (
                      <span className="uppercase font-medium text-red-500">
                        {payment.status}
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
          <LoadingSpinner label="Loading payments..." />
        </div>
      )}
      {loadingLabel && <DialogAction label={loadingLabel} />}
    </>
  );
};

export default PaymentTable;
