import { CreateRefundRequest } from "../types/refund";
import { MP_ACCESS_KEY, MP_API_BASE_URL } from "../config";

class RefundService {
  create = async (req: CreateRefundRequest) => {
    const refundData = {
      email: req.email,
      amount: req.amount,
      mobile_number: req.mobileNumber,
    };

    const response = await fetch(
      `${MP_API_BASE_URL}/refunds/${req.paymentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MP_ACCESS_KEY}`,
        },
        body: JSON.stringify(refundData),
      }
    );

    const data = await response.json();

    return data;
  };
}

export default RefundService;
