import { Check, Ellipsis, X } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { createRefund } from "@/lib/apis/refund";
import { PaymentType } from "@/lib/types/transaction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionDialogProps {
  paymentId: string;
  amount: number;
  email?: string;
  mobileNumber?: string;
  paymentType: PaymentType;
}

const ActionDialog = ({
  paymentId,
  amount,
  email,
  mobileNumber,
  paymentType,
}: ActionDialogProps) => {
  const handleCreateRefund = async () => {
    const response = await createRefund({
      paymentId,
      amount,
      email,
      mobileNumber,
    });

    if (response.data.status === "refund") {
      toast("Refund successfully created", {
        icon: <Check className="w-5 text-green-600" />,
        position: "top-center",
      });

      window.location.reload();
    } else {
      toast("Unable to create refund", {
        icon: <X className="text-destructive w-5" />,
        position: "top-center",
      });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger disabled={paymentType !== "CC.DB"}>
        <Ellipsis
          className={cn("w-5 place-self-end", {
            "text-gray-400": paymentType !== "CC.DB",
          })}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleCreateRefund}>Refund</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDialog;
