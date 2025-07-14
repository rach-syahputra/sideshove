"use client";

import { Fragment, useState } from "react";
import { ChevronRight } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";
import { PAYMENT_TYPE_LABELS } from "@/lib/constants/transaction";
import { usePaymentContext } from "@/context/PaymentContext";
import { usePaymentDetailContext } from "@/context/PaymentDetailContext";
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
import PaymentDetail from "./PaymentDetail";
import ActionDialog from "./ActionDialog";

const PaymentTable = () => {
  const { payments, isLoading } = usePaymentContext();
  const { activePaymentIds, setActivePaymentIds, updateActivePayments } =
    usePaymentDetailContext();
  const [loadingLabel] = useState<string>("");

  const handleClickDetail = (paymentId: string) => {
    // if a transaction detail of a specific row is already active, hide it
    // else, fetch new transaction detail
    const matchPaymentId = activePaymentIds.find(
      (activePaymentId) => activePaymentId === paymentId,
    );

    if (matchPaymentId) {
      setActivePaymentIds((prev) => prev.filter((id) => id !== paymentId));
      updateActivePayments(paymentId);
    } else {
      setActivePaymentIds((prev) => [...prev, paymentId]);
      updateActivePayments(paymentId);
    }
  };

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
              <TableHead>Detail</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.length > 0 &&
              payments.map((payment, index) => {
                const isDetailActive = activePaymentIds.includes(
                  payment.payment_id,
                );

                return (
                  <Fragment key={index}>
                    <TableRow
                      className={`${isDetailActive ? "bg-gray-100" : ""}`}
                    >
                      <TableCell>
                        {formatDate(new Date(payment.payment_date))}
                      </TableCell>
                      <TableCell>{payment.payment_id}</TableCell>
                      <TableCell>{payment.reference_number}</TableCell>
                      <TableCell>
                        {
                          <span
                            className={cn("font-medium text-gray-600", {
                              "text-green-500":
                                payment.payment_type === "CC.DB",
                              "text-yellow-500":
                                payment.payment_type === "CC.CP",
                              "text-destructive":
                                payment.payment_type === "CC.RF" ||
                                payment.payment_type === "CC.RV",
                            })}
                          >
                            {PAYMENT_TYPE_LABELS[payment.payment_type]}
                          </span>
                        }
                      </TableCell>
                      <TableCell>
                        {payment.currency} {payment.amount}
                      </TableCell>
                      <TableCell>
                        {payment.status === "pending" ? (
                          <span className="font-medium text-orange-500 uppercase">
                            ACTIVE
                          </span>
                        ) : payment.status === "success" ? (
                          <span className="font-medium text-green-500 uppercase">
                            {payment.status}
                          </span>
                        ) : (
                          <span className="font-medium text-red-500 uppercase">
                            {payment.status}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <ChevronRight
                          onClick={() => handleClickDetail(payment.payment_id)}
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
                          paymentId={payment.payment_id}
                          amount={payment.amount}
                          paymentType={payment.payment_type}
                          email={payment.email}
                          mobileNumber={payment.mobile_number}
                        />
                      </TableCell>
                    </TableRow>

                    {isDetailActive && (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <PaymentDetail paymentId={payment.payment_id} />
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
          <LoadingSpinner label="Loading payments..." />
        </div>
      )}
      {loadingLabel && <DialogAction label={loadingLabel} />}
    </>
  );
};

export default PaymentTable;
