import {
  CreateTransactionRequest,
  DeleteTransactionRequest,
  GetTransactionDetailRequest,
  GetTransactionsRequest,
  UpdateTransactionRequest,
} from "../types/transaction";
import { MP_ACCESS_KEY, MP_API_BASE_URL } from "../config";

class TransactionService {
  getAll = async (req: GetTransactionsRequest) => {
    const queryParams = new URLSearchParams();
    if (req.page) queryParams.append("page", req.page.toString());
    const query = queryParams.toString();

    const response = await fetch(
      `${MP_API_BASE_URL}/payment-requests${query ? `?${query}` : ""}`,
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

  get = async (req: GetTransactionDetailRequest) => {
    const response = await fetch(
      `${MP_API_BASE_URL}/payment-requests/${req.transactionId}`,
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
      mobile_number: req.mobileNumber,
      payment_frequency: req.paymentFrequency || "ONE-TIME",
      ...(req.initialPaymentAmount
        ? { initial_payment_amount: req.initialPaymentAmount }
        : {}),
      ...(req.paymentStartDate
        ? { payment_start_date: req.paymentStartDate }
        : {}),
      ...(req.paymentEndDate ? { payment_end_date: req.paymentEndDate } : {}),
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

  update = async (req: UpdateTransactionRequest) => {
    const transactionData = {
      transaction_id: req.transactionId,
      request_methods: req.requestMethods,
      reference_number: req.referenceNumber,
      email: req.email,
      amount: req.amount,
      currency: req.currency,
      fixed_amount: true,
      payment_type: req.paymentType,
      mobile_number: req.mobileNumber,
    };

    const response = await fetch(`${MP_API_BASE_URL}/payment-requests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_KEY}`,
      },
      body: JSON.stringify(transactionData),
    });

    const data = await response.json();

    return data;
  };

  delete = async (req: DeleteTransactionRequest) => {
    const response = await fetch(
      `${MP_API_BASE_URL}/payment-requests/${req.transactionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MP_ACCESS_KEY}`,
        },
      }
    );

    const data = await response.json();

    return data;
  };
}

export default TransactionService;
