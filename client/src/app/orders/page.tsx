"use client";

import { useEffect, useState } from "react";

import { formatDate } from "@/lib/utils";
import { Order } from "@/lib/types/order";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkouts`
    );

    const data = await response.json();

    setOrders(data.data);
  };

  const handlePayNow = (id: string) => {
    // full checkout page reload to ensure script re-attaching
    window.location.href = `checkout/${id}`;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex flex-col gap-6 py-8">
          <div className="flex text-center flex-col">
            <h1 className="font-bold text-2xl text-center">
              Transaction History
            </h1>
            <p className="text-sm text-gray-400">
              Review your recent orders and payments.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-gray-400 text-sm font-semibold">
              Collecting transaction history...
            </div>
          ) : (
            <>
              <div className="grid text-sm grid-cols-5 items-center justify-between w-full gap-4">
                <span className="col-span-2 font-bold text-gray-600">ID</span>
                <span className="font-bold text-gray-600">STATUS</span>
                <span className="font-bold text-gray-600">CREATED AT</span>
                <span className="font-bold text-gray-600 place-self-end">
                  ACTION
                </span>
              </div>
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="grid text-sm grid-cols-5 items-center justify-between w-full gap-4"
                >
                  <span className="col-span-2">{order.id}</span>

                  {order.status.code === "000.200.000" ? (
                    <span className="px-3 text-sm py-2 w-fit rounded-md bg-amber-400">
                      PENDING
                    </span>
                  ) : (
                    <span className="px-3 text-sm py-2 w-fit rounded-md bg-green-400">
                      SUCCESS
                    </span>
                  )}

                  <span>{formatDate(new Date(order.createdAt))}</span>

                  {order.status.code === "000.200.000" ? (
                    <Button
                      onClick={() => handlePayNow(order.id)}
                      className="w-fit place-self-end"
                    >
                      Pay Now
                    </Button>
                  ) : (
                    <span className="w-fit place-self-end">PAID</span>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default OrdersPage;
