import { PRODUCTS } from "@/lib/products";
import CheckoutDetail from "@/components/CheckoutDetail";
import CheckoutForm from "@/components/CheckoutForm";

interface CheckoutPageProps {
  searchParams: Promise<{ product: string }>;
}

const CheckoutPage = async ({ searchParams }: CheckoutPageProps) => {
  const slug = (await searchParams).product;
  const product = PRODUCTS.find((product) => product.slug === slug);

  return (
    <div className="max-w-5xl min-h-svh mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-3 py-8">
      <CheckoutDetail {...product!} currency="EUR" />
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
