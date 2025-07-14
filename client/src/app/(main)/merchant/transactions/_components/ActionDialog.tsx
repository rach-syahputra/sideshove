import Link from "next/link";
import { Check, Ellipsis, X } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { deleteTransaction } from "@/lib/apis/transaction";
import {
  PaymentFrequency,
  TransactionStatusType,
} from "@/lib/types/transaction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionDialogProps {
  transactionId: string;
  status: TransactionStatusType;
  paymentFrequency: PaymentFrequency;
}

const ActionDialog = ({
  transactionId,
  status,
  paymentFrequency,
}: ActionDialogProps) => {
  const handleDeleteTransaction = async () => {
    const response = await deleteTransaction(transactionId);

    if (response.data.result === "success") {
      toast("Transaction successfully deleted", {
        icon: <Check className="w-5 text-green-600" />,
        position: "top-center",
      });

      window.location.reload();
    } else {
      toast("Unable to delete transaction", {
        icon: <X className="text-destructive w-5" />,
        position: "top-center",
      });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger disabled={status !== "pending"}>
        <Ellipsis
          className={cn("w-5 place-self-end", {
            "text-gray-400": status !== "pending",
          })}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            href={`/merchant/${paymentFrequency === "ONE-TIME" ? "once_off_payment_request" : "scheduled_payment_request"}/${transactionId}`}
            className="font-medium"
          >
            Edit Request
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeleteTransaction}
          className="font-medium"
        >
          Delete Transaction
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDialog;
