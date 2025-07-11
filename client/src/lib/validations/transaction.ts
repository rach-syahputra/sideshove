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
  paymentType: z.enum(["PA", "DB", "CP", "RF"], {
    message: "Invalid payment type",
    required_error: "Payment type is required",
  }),
});

export const onceOffPaymentRequestWithSMSFormSchema =
  onceOffPaymentRequestFormSchema.extend({
    mobileNumber: z.string().regex(/^\+[1-9]\d{7,14}$/, {
      message: "Invalid mobile number format",
    }),
  });

export const onceOffPaymentRequestWithEmailFormSchema =
  onceOffPaymentRequestFormSchema.extend({
    email: z.string().email({ message: "Invalid email format" }),
  });

export const onceOffPaymentRequestWithSMSAndEmailFormSchema =
  onceOffPaymentRequestFormSchema.extend({
    mobileNumber: z.string().regex(/^\+[1-9]\d{7,14}$/, {
      message: "Invalid mobile number format",
    }),
    email: z.string().email({ message: "Invalid email format" }),
  });
