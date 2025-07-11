"use client";

import InfiniteScroll from "react-infinite-scroll-component";

import { usePaymentContext } from "@/context/PaymentContext";
import PaymentTable from "./_components/PaymentTable";

const TransactionsPage = () => {
  const { fetchPayments, payments, hasMore } = usePaymentContext();

  return (
    <main>
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex flex-col gap-6 py-8">
          <div className="flex flex-col text-center">
            <h1 className="text-center text-2xl font-bold">Payment History</h1>
            <p className="text-sm text-gray-400">
              Review payments made by your customers
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
