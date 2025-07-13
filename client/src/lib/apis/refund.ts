import { CreateRefundRequest } from "../types/refund";

export const createRefund = async (req: CreateRefundRequest) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/refunds/${req.paymentId}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        amount: req.amount,
        email: req.email,
        mobileNumber: req.mobileNumber,
      }),
    },
  );

  const data = await response.json();

  return data;
};
