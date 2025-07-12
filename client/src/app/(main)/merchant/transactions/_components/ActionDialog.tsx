import Link from "next/link";
import { Check, Ellipsis, X } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { deleteTransaction } from "@/lib/apis/transaction";
import { TransactionStatusType } from "@/lib/types/transaction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionDialogProps {
  transactionId: string;
  status: TransactionStatusType;
}

const ActionDialog = ({ transactionId, status }: ActionDialogProps) => {
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
          <Link href={`/merchant/once_off_payment_request/${transactionId}`}>
            Edit Request
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteTransaction}>
          Delete Transaction
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDialog;
