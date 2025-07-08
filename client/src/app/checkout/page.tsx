import CheckoutDetail from "@/components/CheckoutDetail";
import CheckoutForm from "@/components/CheckoutForm";

const CheckoutPage = () => {
  return (
    <div className="max-w-5xl min-h-svh mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-3 py-8">
      <CheckoutDetail />
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
