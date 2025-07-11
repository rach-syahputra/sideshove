import { redirect } from "next/navigation";

import { fetchTransactionDetail } from "@/lib/apis/transaction";
import { OnceOffEditPaymentProvider } from "@/context/OnceOffEditPaymentContext";
import OnceOffPaymentRequestCard from "./_components/OnceOffPaymentRequestCard";

interface OnceOffTransactionPageProps {
  params: Promise<{ transactionId: string }>;
}

const OnceOffTransactionPage = async ({
  params,
}: OnceOffTransactionPageProps) => {
  const transactionId = (await params).transactionId;
  const data = await fetchTransactionDetail(transactionId);

  if (!data) redirect("/merchant/transactions");

  return (
    <div className="mx-auto max-w-3xl p-4">
      <OnceOffEditPaymentProvider transaction={data.data.transaction}>
        <OnceOffPaymentRequestCard />
      </OnceOffEditPaymentProvider>
    </div>
  );
};

export default OnceOffTransactionPage;
