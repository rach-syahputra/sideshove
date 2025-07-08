import CheckoutDetail from "@/components/CheckoutDetail";
import CheckoutForm from "@/components/CheckoutForm";

interface CheckoutPageProps {
  params: Promise<{ id: string }>;
}

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const id = (await params).id;

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkouts/${id}/payment`
  // );

  // const data = await response.json();
  // if (data.data.result.code !== "000.200.000") {
  //   return redirect(`/checkout/success?id=${id}`);
  // }

  return (
    <div className="max-w-5xl min-h-svh mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-3 py-8">
      <CheckoutDetail />
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
