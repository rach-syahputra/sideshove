"use client";

import { usePaymentContext } from "@/context/PaymentContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import PaymentTable from "./_components/PaymentTable";

const TransactionsPage = () => {
  const { isLoading, payments } = usePaymentContext();

  return (
    <main>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col gap-6 py-8">
          <div className="flex text-center flex-col">
            <h1 className="font-bold text-2xl text-center">Payment History</h1>
            <p className="text-sm text-gray-400">
              Review your recent orders and payments.
            </p>
          </div>

          {isLoading ? (
            <div className="mx-auto py-4 flex items-center justify-center">
              <LoadingSpinner label="Collecting transactions..." />
            </div>
          ) : payments.length === 0 ? (
            <p className="text-sm mx-auto py-6 text-muted-foreground">
              No payments.
            </p>
          ) : (
            <PaymentTable />
          )}
        </div>
      </div>
    </main>
  );
};

export default TransactionsPage;
