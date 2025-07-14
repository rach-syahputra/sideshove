import { ScheduledPaymentProvider } from "@/context/ScheduledPaymentContext";
import ScheduledPaymentRequestCard from "./_components/ScheduledPaymentRequestCard";

const OnceOffPaymentRequestPage = () => {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <ScheduledPaymentProvider>
        <ScheduledPaymentRequestCard />
      </ScheduledPaymentProvider>
    </div>
  );
};

export default OnceOffPaymentRequestPage;
