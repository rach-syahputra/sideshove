import Image from "next/image";
import Link from "next/link";

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
          <span className="px-2 py-1 bg-gray-200 text-xs">IN STOCK</span>
        ) : (
          <span className="px-2 py-1 bg-red-400 text-white text-xs">
            NO STOCK
          </span>
        )}
        <span className="text-gray-600 font-semibold">${price}</span>
      </div>
      {stock > 0 ? (
        <Button
          asChild
          className="bg-gray-900 rounded-none text-white px-3 py-2 w-fit mt-2"
        >
          <Link href={`/checkout?slug=${slug}`}>CHECKOUT</Link>
        </Button>
      ) : (
        <Button
          disabled
          className="bg-gray-400 rounded-none  px-3 py-2 w-fit mt-2"
        >
          CHECKOUT
        </Button>
      )}
    </div>
  );
};

export default ProductItem;
