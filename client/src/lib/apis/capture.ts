import { CreateCaptureRequest } from "../types/capture";

export const createCapture = async (req: CreateCaptureRequest) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/captures/${req.paymentId}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        amount: req.amount,
      }),
    },
  );

  const data = await response.json();

  return data;
};
