"use client";

import InfiniteScroll from "react-infinite-scroll-component";

import { usePaymentContext } from "@/context/PaymentContext";
import PaymentTable from "./_components/PaymentTable";

const TransactionsPage = () => {
  const { fetchPayments, payments, hasMore } = usePaymentContext();

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

          <InfiniteScroll
            dataLength={payments.length}
            next={fetchPayments}
            hasMore={hasMore}
            loader={<div></div>}
          >
            <PaymentTable />
          </InfiniteScroll>
        </div>
      </div>
    </main>
  );
};

export default TransactionsPage;
