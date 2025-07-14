import { redirect } from "next/navigation";

import { fetchTransactionDetail } from "@/lib/apis/transaction";
import { ScheduledEditPaymentProvider } from "@/context/ScheduledEditPaymentContext";
import ScheduledPaymentRequestCard from "./_components/ScheduledPaymentRequestCard";

interface ScheduledTransactionPageProps {
  params: Promise<{ transactionId: string }>;
}

const ScheduledTransactionPage = async ({
  params,
}: ScheduledTransactionPageProps) => {
  const transactionId = (await params).transactionId;
  const data = await fetchTransactionDetail(transactionId);

  if (!data) redirect("/merchant/transactions");

  return (
    <div className="mx-auto max-w-3xl p-4">
      <ScheduledEditPaymentProvider transaction={data.data.transaction}>
        <ScheduledPaymentRequestCard />
      </ScheduledEditPaymentProvider>
    </div>
  );
};

export default ScheduledTransactionPage;
