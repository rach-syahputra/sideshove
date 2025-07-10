import { CreateTransactionRequest } from "../types/transaction";
import { MP_ACCESS_KEY } from "../config";

class TransactionService {
  getAll = async () => {
    const response = await fetch(
      "https://test.mobipaid.io/v2/payment-requests",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MP_ACCESS_KEY}`,
        },
      }
    );

    const data = await response.json();

    return data;
  };

  create = async (req: CreateTransactionRequest) => {
    const transactionData = {
      request_methods: req.requestMethods,
      reference_number: req.referenceNumber,
      email: req.email,
      amount: req.amount,
      currency: req.currency,
      fixed_amount: true,
      payment_type: req.paymentType,
    };

    const response = await fetch(
      "https://test.mobipaid.io/v2/payment-requests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MP_ACCESS_KEY}`,
        },
        body: JSON.stringify(transactionData),
      }
    );

    const data = await response.json();

    return data;
  };
}

export default TransactionService;
