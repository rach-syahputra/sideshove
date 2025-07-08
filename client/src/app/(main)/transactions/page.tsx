"use client";

import { useEffect, useState } from "react";

import { Payment } from "@/lib/types/transaction";
import TransactionTable from "@/components/TransactionTable";
import LoadingSpinner from "@/components/LoadingSpinner";

const TransactionsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTransactions = async () => {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments`
    );

    const data = await response.json();

    setPayments(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col gap-6 py-8">
          <div className="flex text-center flex-col">
            <h1 className="font-bold text-2xl text-center">
              Transaction History
            </h1>
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
              No transactions.
            </p>
          ) : (
            <TransactionTable payments={payments} />
          )}
        </div>
      </div>
    </main>
  );
};

export default TransactionsPage;
