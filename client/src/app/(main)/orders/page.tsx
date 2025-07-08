"use client";

import { useEffect, useState } from "react";

import { Order } from "@/lib/types/order";
import TransactionTable from "@/components/TransactionTable";
import LoadingSpinner from "@/components/LoadingSpinner";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkouts`
    );

    const data = await response.json();

    setOrders(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
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
          ) : orders.length === 0 ? (
            <p className="text-sm mx-auto py-6 text-muted-foreground">
              No transactions.
            </p>
          ) : (
            <TransactionTable orders={orders} />
          )}
        </div>
      </div>
    </main>
  );
};

export default OrdersPage;
