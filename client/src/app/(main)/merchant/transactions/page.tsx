"use client";

import InfiniteScroll from "react-infinite-scroll-component";

import { useTransactionContext } from "@/context/TransactionContext";
import { TransactionDetailProvider } from "@/context/TransactionDetailContext";
import TransactionTable from "./_components/TransactionTable";

const TransactionsPage = () => {
  const { fetchTransactions, transactions, hasMore } = useTransactionContext();

  return (
    <main>
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col text-center">
            <h1 className="text-center text-2xl font-bold">Transaction Log</h1>
            <p className="text-sm text-gray-400">
              Review your payment requests
            </p>
          </div>

          <TransactionDetailProvider>
            <InfiniteScroll
              dataLength={transactions.length}
              next={fetchTransactions}
              hasMore={hasMore}
              loader={<div></div>}
            >
              <TransactionTable />
            </InfiniteScroll>
          </TransactionDetailProvider>
        </div>
      </div>
    </main>
  );
};

export default TransactionsPage;
