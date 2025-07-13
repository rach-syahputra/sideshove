import { GetPaymentByIdRequest, GetPaymentsRequest } from "../types/payment";
import { MP_ACCESS_KEY, MP_API_BASE_URL } from "../config";

class PaymentService {
  getAll = async (req: GetPaymentsRequest) => {
    const response = await fetch(
      `${MP_API_BASE_URL}/payments?page=${req.page || 1}`,
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
  getById = async (req: GetPaymentByIdRequest) => {
    const response = await fetch(
      `${MP_API_BASE_URL}/payments/${req.paymentId}`,
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
}

export default PaymentService;
