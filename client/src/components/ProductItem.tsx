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

const ProductItem = ({
  title,
  slug,
  image,
  stock,
  price,
}: ProductItemProps) => {
  const router = useRouter();

  const handleCheckout = async () => {
    router.push(`checkout?product=${slug}`);
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <Image
        src={image}
        alt="Product image"
        width={500}
        height={500}
        className="aspect-square object-cover"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex items-center gap-4">
        {stock > 0 ? (
          <span className="rounded-md bg-gray-200 px-2 py-1 text-xs">
            IN STOCK
          </span>
        ) : (
          <span className="rounded-md bg-red-400 px-2 py-1 text-xs text-white">
            NO STOCK
          </span>
        )}
        <span className="font-semibold text-gray-600">${price}</span>
      </div>
      {stock > 0 ? (
        <Button
          onClick={handleCheckout}
          className="mt-2 w-fit bg-gray-900 px-3 py-2 text-white"
        >
          CHECKOUT
        </Button>
      ) : (
        <Button disabled className="mt-2 w-fit bg-gray-400 px-3 py-2">
          CHECKOUT
        </Button>
      )}
    </div>
  );
};

export default ProductItem;
