"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy, QrCode } from "lucide-react";
import QRCode from "qrcode";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingSpinner from "@/components/LoadingSpinner";

interface PaymentTypeDialogProps {
  label: string;
  url: string;
}

const PaymentTypeDialog = ({ label, url }: PaymentTypeDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [isCopied, setisCopied] = useState<boolean>(false);

  const generateQR = async () => {
    setIsLoading(true);

    try {
      const generatedQrUrl = await QRCode.toDataURL(url, { margin: 0 });
      setQrUrl(generatedQrUrl);
    } catch (err) {
      console.error("Failed to generate QR code", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setisCopied(true);
  };

  useEffect(() => {
    setisCopied(false);
  }, []);

  useEffect(() => {
    if (open) {
      generateQR();
    }
  }, [open, url]);

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
      <DialogContent className="w-[280px]">
        <DialogHeader>
          <DialogTitle>Payment URL</DialogTitle>
          <div className="mt-4 flex flex-col items-center justify-center gap-6">
            {!isLoading && qrUrl ? (
              <Link href={url} target="_blank">
                <Image
                  src={qrUrl}
                  alt="QR Code"
                  width={500}
                  height={500}
                  className="w-[280px] aspect-square object-cover"
                />
              </Link>
            ) : (
              <LoadingSpinner label="Generating QR Code" />
            )}
            <Button onClick={handleCopyUrl} className="w-full">
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
