"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Check } from "lucide-react";

import { CURRENCIES } from "@/lib/constants/transaction";
import { onceOffPaymentRequestWithSMSFormSchema } from "@/lib/validations/transaction";
import { useOnceOffEditPaymentContext } from "@/context/OnceOffEditPaymentContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const OnceOffPaymentRequestWithSMSForm = () => {
  const router = useRouter();
  const { setStep, transaction } = useOnceOffEditPaymentContext();

  const form = useForm<z.infer<typeof onceOffPaymentRequestWithSMSFormSchema>>({
    resolver: zodResolver(onceOffPaymentRequestWithSMSFormSchema),
    defaultValues: {
      referenceNumber: transaction.reference_number,
      mobileNumber: transaction.mobile_number,
      amount: Number(transaction.amount),
      currency: transaction.currency,
      paymentType: transaction.payment_type,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof onceOffPaymentRequestWithSMSFormSchema>,
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${transaction.transaction_id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          requestMethods: ["SMS"],
          referenceNumber: values.referenceNumber,
          mobileNumber: values.mobileNumber,
          amount: values.amount,
          currency: values.currency,
          paymentType: values.paymentType,
        }),
      },
    );

    const data = await response.json();

    if (data.data.result === "success") {
      toast("Payment request successfully updated", {
        icon: <Check className="w-5 text-green-600" />,
        position: "top-center",
      });
      router.push("/merchant/transactions");
    } else {
      form.setError("root", {
        message: data.data.error_message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="grid grid-cols-2 items-start gap-8">
          <FormField
            control={form.control}
            name="referenceNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Reference number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency.id} value={currency.id}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Payment Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col"
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="DB" />
                      </FormControl>
                      <FormLabel className="font-normal">Debit</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="PA" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Pre-Authorization
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mobile number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>e.g., +1234567899900</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.formState.errors.root && (
          <p className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </p>
        )}

        <div className="grid w-full grid-cols-2 items-center justify-between gap-4">
          <Button onClick={() => setStep((prev) => prev - 1)} variant="outline">
            Back
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Submit Payment Request
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OnceOffPaymentRequestWithSMSForm;
