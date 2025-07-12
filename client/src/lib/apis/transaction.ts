export const fetchTransactionDetail = async (transactionId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${transactionId}`,
  );

  const data = await response.json();

  return data;
};

export const deleteTransaction = async (transactionId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${transactionId}`,
    {
      method: "DELETE",
    },
  );

  const data = await response.json();

  return data;
};
