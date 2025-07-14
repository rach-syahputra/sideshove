import { z } from "zod";

// once-off payment request
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
  paymentType: z.enum(
    [
      "PA",
      "DB",
      "CP",
      "RF",
      "RV",
      "CC.PA",
      "CC.DB",
      "CC.CP",
      "CC.RF",
      "CC.RV",
      "CC.SD",
      "CC.RG",
    ],
    {
      message: "Invalid payment type",
      required_error: "Payment type is required",
    },
  ),
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

// scheduled/recurring payment request
const scheduledPaymentRequestFormSchema = z.object({
  referenceNumber: z.string({
    message: "Invalid reference number",
    required_error: "Reference number is required",
  }),
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
  paymentFrequency: z.enum(["WEEKLY", "MONTHLY", "QUARTERLY", "YEARLY"], {
    message: "Invalid payment frequency",
    required_error: "Payment frequency is required",
  }),
  initialPaymentAmount: z
    .number({
      message: "Invalid initial payment amount",
      required_error: "Initial payment amount is required",
    })
    .min(1, "Initial payment amount cannot be 0"),
  paymentStartDate: z.date({
    message: "Invalid payment start date",
    required_error: "Payment start date is required",
  }),
});

export const scheduledPaymentRequestWithSMSFormSchema =
  scheduledPaymentRequestFormSchema.extend({
    mobileNumber: z.string().regex(/^\+[1-9]\d{7,14}$/, {
      message: "Invalid mobile number format",
    }),
  });

export const scheduledPaymentRequestWithEmailFormSchema =
  scheduledPaymentRequestFormSchema.extend({
    email: z.string().email({ message: "Invalid email format" }),
  });

export const scheduledPaymentRequestWithSMSAndEmailFormSchema =
  scheduledPaymentRequestFormSchema.extend({
    mobileNumber: z.string().regex(/^\+[1-9]\d{7,14}$/, {
      message: "Invalid mobile number format",
    }),
    email: z.string().email({ message: "Invalid email format" }),
  });
