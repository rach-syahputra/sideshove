import { NextFunction, Request, Response } from "express";

import RefundService from "../services/refund.service";

class RefundController {
  private refundService: RefundService;

  constructor() {
    this.refundService = new RefundService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { paymentId } = req.params;
    const { email, mobileNumber, amount } = req.body;

    try {
      const response = await this.refundService.create({
        email,
        mobileNumber,
        paymentId,
        amount: Number(amount),
      });

      res.status(201).json({
        message: "Refund created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default RefundController;
