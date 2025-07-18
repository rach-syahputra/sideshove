"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { CURRENCIES } from "@/lib/constants/transaction";
import { scheduledPaymentRequestWithSMSFormSchema } from "@/lib/validations/transaction";
import { useScheduledPaymentContext } from "@/context/ScheduledPaymentContext";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const ScheduledPaymentRequestWithSMSForm = () => {
  const router = useRouter();
  const { setStep } = useScheduledPaymentContext();

  const form = useForm<
    z.infer<typeof scheduledPaymentRequestWithSMSFormSchema>
  >({
    resolver: zodResolver(scheduledPaymentRequestWithSMSFormSchema),
    defaultValues: {
      referenceNumber: "",
      mobileNumber: "",
      amount: 0,
      currency: "ZAR",
      paymentType: "DB",
      paymentFrequency: "MONTHLY",
      initialPaymentAmount: 0,
      paymentStartDate: new Date(),
    },
  });

  const onSubmit = async (
    values: z.infer<typeof scheduledPaymentRequestWithSMSFormSchema>,
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`,
      {
        method: "POST",
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
          initialPaymentAmount: values.initialPaymentAmount,
          paymentFrequency: values.paymentFrequency,
          paymentStartDate: values.paymentStartDate.toISOString(),
          paymentEndDate: new Date(
            values.paymentStartDate.getFullYear(),
            values.paymentStartDate.getMonth(),
            28,
          ).toDateString(),
        }),
      },
    );

    const data = await response.json();

    if (data.data.result === "success") {
      toast("Payment request successfully created", {
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
            name="paymentFrequency"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Billing Cycle</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-4"
                  >
                    <FormItem className="flex cursor-pointer items-center">
                      <FormControl>
                        <RadioGroupItem value="WEEKLY" />
                      </FormControl>
                      <FormLabel className="font-normal">Weekly</FormLabel>
                    </FormItem>
                    <FormItem className="flex cursor-pointer items-center">
                      <FormControl>
                        <RadioGroupItem value="MONTHLY" />
                      </FormControl>
                      <FormLabel className="font-normal">Monthly</FormLabel>
                    </FormItem>
                    <FormItem className="flex cursor-pointer items-center">
                      <FormControl>
                        <RadioGroupItem value="QUARTERLY" />
                      </FormControl>
                      <FormLabel className="font-normal">Quarterly</FormLabel>
                    </FormItem>
                    <FormItem className="flex cursor-pointer items-center">
                      <FormControl>
                        <RadioGroupItem value="YEARLY" />
                      </FormControl>
                      <FormLabel className="font-normal">Yearly</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="initialPaymentAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Payment Amount</FormLabel>
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
            name="paymentStartDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Payment Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>

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

export default ScheduledPaymentRequestWithSMSForm;
