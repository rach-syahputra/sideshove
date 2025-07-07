import Link from "next/link";
import { CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ id: string }>;
}

const CheckoutSuccessPage = async ({
  searchParams,
}: CheckoutSuccessPageProps) => {
  const id = (await searchParams).id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkouts/${id}/payment`
  );
  const data = await response.json();

  return (
    <div className="bg-gray-100 w-screen min-h-svh flex items-center justify-center">
      <div className="rounded-md min-w-96 shadow text-center bg-white p-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <CheckCheck className="w-8 h-auto text-green-600" />
          <h1 className="text-lg font-bold">Payment Successful</h1>
        </div>
        <p className="text-sm text-gray-500">Thank you for your payment.</p>
        <div className="h-[0.5px] w-full bg-gray-500 my-4 opacity-40"></div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-500 text-sm">ID:</span>
            <span className="font-semibold">{data.data.id}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-500 text-sm">Amount Paid:</span>
            <span className="font-semibold">${data.data.amount}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-500 text-sm">Payment Method:</span>
            <span className="font-semibold">{data.data.paymentBrand}</span>
          </div>
        </div>
        <Button asChild className="rounded-md mt-8 w-full">
          <Link href="/">Back to Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
