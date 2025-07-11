"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CURRENCIES, phonePrefixes } from "@/lib/constants/transaction";
import { onceOffPaymentRequestWithSMSAndEmailFormSchema } from "@/lib/validations/transaction";
import { useOnceOffPaymentContext } from "@/context/OnceOffPaymentContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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

const OnceOffPaymentRequestWithSMSAndEmailForm = () => {
  const router = useRouter();
  const { setStep } = useOnceOffPaymentContext();

  const form = useForm<
    z.infer<typeof onceOffPaymentRequestWithSMSAndEmailFormSchema>
  >({
    resolver: zodResolver(onceOffPaymentRequestWithSMSAndEmailFormSchema),
    defaultValues: {
      referenceNumber: "",
      phonePrefix: "+62",
      mobileNumber: "",
      email: "",
      amount: 0,
      currency: "ZAR",
      paymentType: "DB",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof onceOffPaymentRequestWithSMSAndEmailFormSchema>,
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
          mobileNumber: `${values.phonePrefix}${values.mobileNumber}`,
          amount: values.amount,
          currency: values.currency,
          paymentType: values.paymentType,
        }),
      },
    );

    const data = await response.json();

    if (data.data.result === "success") {
      router.push("/merchant/transactions");
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
            render={() => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <div className="border-input bg-background flex overflow-hidden rounded-md border shadow-sm">
                  <FormField
                    control={form.control}
                    name="phonePrefix"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-24 rounded-none border-r border-none px-2">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {phonePrefixes.map((item) => (
                            <SelectItem key={item.key} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          placeholder="81234567890"
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

export default OnceOffPaymentRequestWithSMSAndEmailForm;
