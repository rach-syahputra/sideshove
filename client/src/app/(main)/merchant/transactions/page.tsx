"use client";

import InfiniteScroll from "react-infinite-scroll-component";

import { useTransactionContext } from "@/context/TransactionContext";
import TransactionTable from "./_components/TransactionTable";

const TransactionsPage = () => {
  const { fetchTransactions, transactions, hasMore } = useTransactionContext();

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

          <InfiniteScroll
            dataLength={transactions.length}
            next={fetchTransactions}
            hasMore={hasMore}
            loader={<div></div>}
          >
            <TransactionTable />
          </InfiniteScroll>
        </div>
      </div>
    </main>
  );
};

export default TransactionsPage;
