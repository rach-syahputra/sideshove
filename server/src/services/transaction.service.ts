import {
  CreateTransactionRequest,
  GetTransactionsRequest,
} from "../types/transaction";
import { MP_ACCESS_KEY, MP_API_BASE_URL } from "../config";

class TransactionService {
  getAll = async (req: GetTransactionsRequest) => {
    const response = await fetch(
      `${MP_API_BASE_URL}/payment-requests?page=${req.page || 1}`,
      {
        method: "GET",
        headers: {
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

    const response = await fetch(`${MP_API_BASE_URL}/payment-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_KEY}`,
      },
      body: JSON.stringify(transactionData),
    });

    const data = await response.json();

    return data;
  };
}

export default TransactionService;
