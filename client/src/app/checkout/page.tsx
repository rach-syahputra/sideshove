import CheckoutForm from "@/components/CheckoutForm";

const CheckoutPage = () => {
  return (
    <div className="max-w-xl min-h-svh mx-auto flex flex-col lg:grid gap-8 lg:gap-3 py-8">
      {/* <CheckoutDetail /> */}
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
