import Link from "next/link";
import { Ellipsis } from "lucide-react";

import { cn } from "@/lib/utils";
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDialog;
