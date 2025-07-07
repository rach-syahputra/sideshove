import CheckoutForm from "@/components/CheckoutForm";

interface CheckoutPageProps {
  params: Promise<{ id: string }>;
}

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const id = (await params).id;
  return <CheckoutForm id={id} />;
};

export default CheckoutPage;
