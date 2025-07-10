import { z } from "zod";

export const onceOffPaymentRequestWithSMSFormSchema = z.object({
  referenceNumber: z.string().optional(),
  phonePrefix: z.string({ message: "Invalid phone number" }),
  mobileNumber: z
    .string({ message: "Mobile number is required" })
    .min(11, "Invalid mobile number"),
  currency: z.enum(["ZAR", "EUR", "USD", "GBP"], {
    message: "Invalid currency",
    required_error: "Currency is required",
  }),
  amount: z.number({
    message: "Invalid amount",
    required_error: "Amount is required",
  }),
  paymentType: z.enum(["PA", "DB"], {
    message: "Invalid payment type",
    required_error: "Payment type is required",
  }),
});

export const onceOffPaymentRequestWithEmailFormSchema = z.object({
  referenceNumber: z.string().optional(),
  email: z.string().email({ message: "Invalid email format" }),
  currency: z.enum(["ZAR", "EUR", "USD", "GBP"], {
    message: "Invalid currency",
    required_error: "Currency is required",
  }),
  amount: z.number({
    message: "Invalid amount",
    required_error: "Amount is required",
  }),
  paymentType: z.enum(["PA", "DB"], {
    message: "Invalid payment type",
    required_error: "Payment type is required",
  }),
});
