import { MP_ACCESS_KEY, MP_API_BASE_URL } from "../config";
import { CreateCaptureRequest } from "../types/capture";

class CaptureService {
  create = async (req: CreateCaptureRequest) => {
    const refundData = {
      amount: req.amount,
    };

    const response = await fetch(
      `${MP_API_BASE_URL}/captures/${req.paymentId}`,
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

export default CaptureService;
