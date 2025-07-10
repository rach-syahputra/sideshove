import { MP_ACCESS_KEY, MP_API_BASE_URL } from "../config";

class PaymentService {
  getAll = async () => {
    const response = await fetch(`${MP_API_BASE_URL}/payments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${MP_ACCESS_KEY}`,
      },
    });

    const data = await response.json();

    return data;
  };
}

export default PaymentService;
