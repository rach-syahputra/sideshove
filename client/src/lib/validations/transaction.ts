import { z } from "zod";

export const onceOffPaymentRequestFormSchema = z.object({
  requestMethods: z.array(z.enum(["SMS", "EMAIL", "WEB"]), {
    message: "Payment method must be either SMS, EMAIL, or WEB",
    required_error: "Payment method is required",
  }),
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
