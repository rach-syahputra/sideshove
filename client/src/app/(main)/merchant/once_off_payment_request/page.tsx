import { OnceOffPaymentProvider } from "@/context/OnceOffPaymentContext";
import OnceOffPaymentRequestCard from "./_components/OnceOffPaymentRequestCard";

const OnceOffPaymentRequestPage = () => {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <OnceOffPaymentProvider>
        <OnceOffPaymentRequestCard />
      </OnceOffPaymentProvider>
    </div>
  );
};

export default OnceOffPaymentRequestPage;
