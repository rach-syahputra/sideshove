import { NextFunction, Request, Response } from "express";

import PaymentService from "../services/payment.service";

class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { page, keywords } = req.query;

    try {
      const response = await this.paymentService.getAll({
        page: Number(page) || 1,
        keywords: keywords?.toString(),
      });

      res.status(200).json({
        message: "Payments retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { paymentId } = req.params;

    try {
      const response = await this.paymentService.getById({
        paymentId,
      });

      res.status(200).json({
        message: "Payment detail retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default PaymentController;
