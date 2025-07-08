"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

interface ProductItemProps {
  id: number;
  slug: string;
  title: string;
  image: string;
  stock: number;
  price: number;
}

const ProductItem = ({ title, image, stock, price }: ProductItemProps) => {
  const router = useRouter();

  const handleCheckout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkouts`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          amount: price,
        }),
      }
    );

    const data = await response.json();

    console.log("checkout data", data);

    if (data) {
      router.push(`checkout/${data.data.id}`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <Image
        src={image}
        alt="Product image"
        width={500}
        height={500}
        className="object-cover aspect-square"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex items-center gap-4">
        {stock > 0 ? (
          <span className="px-2 py-1 bg-gray-200 text-xs rounded-md">
            IN STOCK
          </span>
        ) : (
          <span className="px-2 py-1 bg-red-400 text-white text-xs rounded-md">
            NO STOCK
          </span>
        )}
        <span className="text-gray-600 font-semibold">${price}</span>
      </div>
      {stock > 0 ? (
        <Button
          onClick={handleCheckout}
          className="bg-gray-900  text-white px-3 py-2 w-fit mt-2"
        >
          CHECKOUT
        </Button>
      ) : (
        <Button disabled className="bg-gray-400   px-3 py-2 w-fit mt-2">
          CHECKOUT
        </Button>
      )}
    </div>
  );
};

export default ProductItem;
