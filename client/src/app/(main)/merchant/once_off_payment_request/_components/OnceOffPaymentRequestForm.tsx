"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CURRENCIES, REQUEST_METHODS } from "@/lib/constants/transaction";
import { onceOffPaymentRequestFormSchema } from "@/lib/validations/transaction";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const OnceOffPaymentRequestForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof onceOffPaymentRequestFormSchema>>({
    resolver: zodResolver(onceOffPaymentRequestFormSchema),
    defaultValues: {
      requestMethods: ["EMAIL"],
      referenceNumber: "",
      email: "",
      amount: 0,
      currency: "ZAR",
      paymentType: "DB",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof onceOffPaymentRequestFormSchema>
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          requestMethods: values.requestMethods,
          referenceNumber: values.referenceNumber,
          email: values.email,
          amount: values.amount,
          currency: values.currency,
          paymentType: values.paymentType,
        }),
      }
    );

    const data = await response.json();

    if (data.data.result === "success") {
      router.push("/merchant/transactions");
    }
  };

  return (
    <div className="flex p-4 flex-col lg:pl-8 items-center justify-start gap-6 lg:col-span-2">
      <div className="flex text-center flex-col gap-1">
        <h1 className="text-2xl font-bold">Single Payment Request</h1>
        <p className="text-sm text-gray-500">Create your payment securely.</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="requestMethods"
            render={() => (
              <FormItem>
                <FormLabel>Delivery Options</FormLabel>
                {REQUEST_METHODS.map((method) => (
                  <FormField
                    key={method.id}
                    control={form.control}
                    name="requestMethods"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={method.id}
                          className="flex flex-row items-center gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(method.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, method.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== method.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {method.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referenceNumber"
            render={({ field }) => (
              <FormItem>
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
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[140px]">
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

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            Submit Payment Request
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OnceOffPaymentRequestForm;
