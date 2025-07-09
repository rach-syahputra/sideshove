import { Product } from "@/lib/types/product";

interface CheckoutDetailProps extends Product {
  currency: string;
}

const CheckoutDetail = ({ title, price, currency }: CheckoutDetailProps) => {
  return (
    <div className="flex p-4 mx-auto flex-col lg:pr-8 w-full items-center justify-start lg:col-span-1 gap-2 max-lg:max-w-96 lg:border-r-[1px] lg:border-gray-200">
      <h2 className="text-2xl font-bold">Transaction Detail</h2>
      <div className="flex w-full my-4 items-center flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <span className="text-gray-500 text-sm font-semibold">
            Product Title:
          </span>
          <span className="font-semibold">{title}</span>
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <span className="text-gray-500 text-sm font-semibold">Amount:</span>
          <span className="font-semibold">{price}</span>
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <span className="text-gray-500 text-sm font-semibold">Currency:</span>
          <span className="font-semibold">{currency}</span>
        </div>
      </div>
      {/* <p className="text-sm text-gray-500 text-center">
        You can pay later by visiting transaction history.
      </p>
      <Button asChild variant="outline" className="w-full">
        <Link href="/orders">View Transaction History</Link>
      </Button>
      <Button asChild variant="ghost" className="w-full">
        <Link href="/">Back to Shopping</Link>
      </Button> */}
    </div>
  );
};

export default CheckoutDetail;
