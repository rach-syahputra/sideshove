export const fetchPaymentDetail = async (paymentId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/${paymentId}`,
  );

  const data = await response.json();

  return data;
};
