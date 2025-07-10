import { NextFunction, Request, Response } from "express";

import PaymentService from "../services/payment.service";

class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.paymentService.getAll();

      res.status(200).json({
        message: "Payments retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default PaymentController;
