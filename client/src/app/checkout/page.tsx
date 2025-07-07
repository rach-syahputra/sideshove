import CheckoutForm from "@/components/CheckoutForm";

interface CheckoutPageProps {
  searchParams: Promise<{ slug: string }>;
}

const CheckoutPage = async ({ searchParams }: CheckoutPageProps) => {
  const slug = (await searchParams).slug;
  return <CheckoutForm productSlug={slug} />;
};

export default CheckoutPage;
