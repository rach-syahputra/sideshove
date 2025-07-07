import Link from "next/link";

import { Button } from "@/components/ui/button";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const productId = (await params).id;
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/api/checkouts/${productId}/payment`
  );
  const data = await response.json();
  console.log(data);

  return (
    <div className="bg-gray-100 w-screen min-h-svh flex items-center justify-center">
      <div className="rounded-md min-w-96 shadow text-center bg-white p-4">
        <h1 className="text-lg font-bold">Order Status</h1>
        <p className="text-sm text-gray-500">
          Stay updated on your purchase status.
        </p>
        <div className="h-[0.5px] w-full bg-gray-500 my-4 opacity-40"></div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-500 text-sm">ID:</span>
            <span className="font-semibold">{data.id}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-500 text-sm">Payment Method:</span>
            <span className="font-semibold">VISA</span>
          </div>
        </div>
        <Button asChild className="rounded-md mt-8 w-full">
          <Link href="/">Back to Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;
