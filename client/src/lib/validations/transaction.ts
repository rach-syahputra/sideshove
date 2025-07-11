import { z } from "zod";

const onceOffPaymentRequestFormSchema = z.object({
  referenceNumber: z.string().optional(),
  currency: z.enum(["ZAR", "EUR", "USD", "GBP"], {
    message: "Invalid currency",
    required_error: "Currency is required",
  }),
  amount: z
    .number({
      message: "Invalid amount",
      required_error: "Amount is required",
    })
    .min(1, "Amount cannot be 0"),
  paymentType: z.enum(["PA", "DB"], {
    message: "Invalid payment type",
    required_error: "Payment type is required",
  }),
});

export const onceOffPaymentRequestWithSMSFormSchema =
  onceOffPaymentRequestFormSchema.extend({
    phonePrefix: z.string({ message: "Invalid phone number" }),
    mobileNumber: z
      .string({ message: "Mobile number is required" })
      .min(10, "Invalid mobile number"),
  });

export const onceOffPaymentRequestWithEmailFormSchema =
  onceOffPaymentRequestFormSchema.extend({
    email: z.string().email({ message: "Invalid email format" }),
  });

export const onceOffPaymentRequestWithSMSAndEmailFormSchema =
  onceOffPaymentRequestFormSchema.extend({
    phonePrefix: z.string({ message: "Invalid phone number" }),
    mobileNumber: z
      .string({ message: "Mobile number is required" })
      .min(10, "Invalid mobile number"),
    email: z.string().email({ message: "Invalid email format" }),
  });
