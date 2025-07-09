import querystring from "querystring";

import PaymentRepository from "../repositories/payment.repository";
import {
  CreatePaymentServiceRequest,
  GetAllPaymentRequest,
  UpdatePaymentServiceRequest,
} from "../types/payment";

class PaymentService {
  private paymentRepository: PaymentRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  create = async (req: CreatePaymentServiceRequest) => {
    const paymentData = querystring.stringify({
      entityId: "8ac7a4c79394bdc801939736f17e063d",
      amount: req.amount.toString(),
      currency: req.currency,
      paymentBrand: req.brand,
      paymentType: req.type || "PA",
      "card.number": req.number,
      "card.holder": req.holder,
      "card.expiryMonth": req.expiryMonth,
      "card.expiryYear": req.expiryYear,
      "card.cvv": req.cvv,
    });

    // create payment
    const response = await fetch("https://eu-test.oppwa.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Bearer OGFjN2E0Yzc5Mzk0YmRjODAxOTM5NzM2ZjFhNzA2NDF8enlac1lYckc4QXk6bjYzI1NHNng=",
      },
      body: paymentData,
    });

    const data = await response.json();

    // store paid payment data to db
    if (data.result.code === "000.100.110") {
      await this.paymentRepository.create({
        id: data.id,
        amount: req.amount,
        currency: req.currency,
        brand: req.brand,
        type: req.type,
        status: "PAID",
      });
    }

    return data;
  };

  getAll = async (req: GetAllPaymentRequest) => {
    return await this.paymentRepository.getAll(req);
  };

  update = async (req: UpdatePaymentServiceRequest) => {
    const paymentData = querystring.stringify({
      entityId: "8ac7a4c79394bdc801939736f17e063d",
      amount: String(req.amount),
      currency: req.currency,
      paymentType: req.type || "CP",
    });

    const response = await fetch(
      `https://eu-test.oppwa.com/v1/payments/${req.referencedId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer OGFjN2E0Yzc5Mzk0YmRjODAxOTM5NzM2ZjFhNzA2NDF8enlac1lYckc4QXk6bjYzI1NHNng=",
        },
        body: paymentData,
      }
    );

    const data = await response.json();

    // create new captured or refunded payment
    if (data.result.code === "000.100.110") {
      await this.paymentRepository.update({
        amount: req.amount,
        currency: req.currency,
        newPaymentId: data.id,
        referencedId: req.referencedId,
        type: req.type,
      });
    }

    return data;
  };
}

export default PaymentService;
