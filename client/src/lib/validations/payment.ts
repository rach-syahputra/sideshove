import { z } from "zod";

export const paymentFormSchema = z.object({
  brand: z.enum(["VISA", "MASTER"]),
  number: z.string().min(16).max(16),
  expiryDate: z.string().min(4).max(4),
  holder: z.string().min(2).max(50),
  cvv: z.string().min(3).max(3),
});
