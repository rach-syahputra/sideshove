import { Check, Ellipsis, X } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { createRefund } from "@/lib/apis/refund";
import { createCapture } from "@/lib/apis/capture";
import { PaymentType } from "@/lib/types/transaction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createReversal } from "@/lib/apis/reversal";

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
  const isDisabled =
    paymentType === "CC.CP" ||
    paymentType === "CC.RF" ||
    paymentType === "CC.RV";

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

  const handleCreateCapture = async () => {
    const response = await createCapture({
      paymentId,
      amount,
    });

    if (response.data.status === "capture") {
      window.location.reload();

      toast("Refund successfully created", {
        icon: <Check className="w-5 text-green-600" />,
        position: "top-center",
      });
    } else {
      toast(response.data?.message || "Unable to create capture", {
        icon: <X className="text-destructive w-5" />,
        position: "top-center",
      });
    }
  };

  const handleReversalCapture = async () => {
    const response = await createReversal({
      paymentId,
      email: email || "",
      mobileNumber: mobileNumber || "",
    });

    if (response.data.status === "reversal") {
      window.location.reload();

      toast("Reversal successfully created", {
        icon: <Check className="w-5 text-green-600" />,
        position: "top-center",
      });
    } else {
      toast(response.data?.message || "Unable to create reversal", {
        icon: <X className="text-destructive w-5" />,
        position: "top-center",
      });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger disabled={isDisabled}>
        <Ellipsis
          className={cn("w-5 place-self-end", {
            "text-gray-400": isDisabled,
          })}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {paymentType === "CC.DB" && (
          <DropdownMenuItem onClick={handleCreateRefund}>
            Refund
          </DropdownMenuItem>
        )}

        {paymentType === "CC.PA" && (
          <>
            <DropdownMenuItem
              onClick={handleCreateCapture}
              className="font-medium"
            >
              Capture
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleReversalCapture}
              className="font-medium"
            >
              Reversal
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDialog;
