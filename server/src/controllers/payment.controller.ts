import { NextFunction, Request, Response } from "express";

import { PaymentType } from "@prisma/client";
import PaymentService from "../services/payment.service";

class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { amount, brand, number, holder, expiryMonth, expiryYear, cvv } =
      req.body;
    const { paymentType } = req.query;

    try {
      const response = await this.paymentService.create({
        amount,
        currency: "EUR",
        brand,
        type: paymentType as PaymentType,
        number,
        holder,
        expiryMonth,
        expiryYear,
        cvv,
      });

      res.status(201).json({
        message: "Payment created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.query;

    try {
      const response = await this.paymentService.getAll({
        type: type as PaymentType,
      });

      res.status(200).json({
        message: "Payments retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { type } = req.query;
    const { amount } = req.body;

    try {
      const response = await this.paymentService.update({
        amount,
        currency: "EUR",
        referencedId: id,
        type: type as PaymentType,
      });

      res.status(201).json({
        message: "Payment updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default PaymentController;
