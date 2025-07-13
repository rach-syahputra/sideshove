import { MP_ACCESS_KEY, MP_API_BASE_URL } from "../config";
import { CreateReversalRequest } from "../types/reversal";

class ReversalService {
  create = async (req: CreateReversalRequest) => {
    const reversalData = {
      email: req.email,
      mobile_number: req.mobileNumber,
    };

    const response = await fetch(
      `${MP_API_BASE_URL}/reversal/${req.paymentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MP_ACCESS_KEY}`,
        },
        body: JSON.stringify(reversalData),
      }
    );

    const data = await response.json();

    return data;
  };
}

export default ReversalService;
