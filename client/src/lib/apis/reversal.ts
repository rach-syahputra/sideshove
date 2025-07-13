import { CreateReversalRequest } from "../types/reversal";

export const createReversal = async (req: CreateReversalRequest) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/reversal/${req.paymentId}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: req.email,
        mobileNumber: req.mobileNumber,
      }),
    },
  );

  const data = await response.json();

  return data;
};
