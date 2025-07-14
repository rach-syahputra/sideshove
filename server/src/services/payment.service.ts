import { GetPaymentByIdRequest, GetPaymentsRequest } from "../types/payment";
import { MP_ACCESS_KEY, MP_API_BASE_URL } from "../config";

class PaymentService {
  getAll = async (req: GetPaymentsRequest) => {
    const queryParams = new URLSearchParams();
    if (req.page) queryParams.append("page", req.page.toString());
    if (req.keywords) queryParams.append("keywords", req.keywords);
    const query = queryParams.toString();

    const response = await fetch(
      `${MP_API_BASE_URL}/payments${query ? `?${query}` : ""}`,
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
