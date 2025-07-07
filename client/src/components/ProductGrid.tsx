import { PRODUCTS } from "@/lib/products";
import ProductItem from "./ProductItem";

const ProductGrid = () => {
  return (
    <ul className="grid grid-cols-4 gap-x-4 gap-y-12">
      {PRODUCTS.map((product) => (
        <li key={product.id}>
          <ProductItem {...product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductGrid;
