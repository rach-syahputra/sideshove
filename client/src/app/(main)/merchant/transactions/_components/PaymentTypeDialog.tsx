"use client";

import { useEffect, useState } from "react";
import { Check, Copy, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PaymentTypeDialogProps {
  label: string;
  url: string;
}

const PaymentTypeDialog = ({ label, url }: PaymentTypeDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isCopied, setisCopied] = useState<boolean>(false);

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setisCopied(true);
  };

  useEffect(() => {
    setisCopied(false);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) setisCopied(false);
        setOpen(value);
      }}
    >
      <DialogTrigger className="flex items-center gap-2 text-blue-700">
        <QrCode className="w-4" /> {label}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment URL</DialogTitle>
          <div className="mt-4">
            <Button onClick={handleCopyUrl}>
              {isCopied ? <Check /> : <Copy />}
              Copy URL
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentTypeDialog;
