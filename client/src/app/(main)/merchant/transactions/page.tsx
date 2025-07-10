"use client";

import { useTransactionContext } from "@/context/TransactionContext";
import TransactionTable from "@/app/(main)/merchant/transactions/_components/TransactionTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionsPage = () => {
  const { isLoading, transactions, type, setType } = useTransactionContext();

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

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Payment Type</SelectLabel>
                <SelectItem value="PA">Pre-Authorize</SelectItem>
                <SelectItem value="CP">Capture</SelectItem>
                <SelectItem value="DB">Debit</SelectItem>
                <SelectItem value="RF">Refund</SelectItem>
                <SelectItem value="ALL">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {isLoading ? (
            <div className="mx-auto py-4 flex items-center justify-center">
              <LoadingSpinner label="Collecting transactions..." />
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-sm mx-auto py-6 text-muted-foreground">
              No transactions.
            </p>
          ) : (
            <TransactionTable />
          )}
        </div>
      </div>
    </main>
  );
};

export default TransactionsPage;
