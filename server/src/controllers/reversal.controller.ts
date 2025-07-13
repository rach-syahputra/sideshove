import { NextFunction, Request, Response } from "express";

import ReversalService from "../services/reversal.service";

class ReversalController {
  private reversalService: ReversalService;

  constructor() {
    this.reversalService = new ReversalService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { paymentId } = req.params;
    const { email, mobileNumber } = req.body;

    try {
      const response = await this.reversalService.create({
        paymentId,
        email,
        mobileNumber,
      });

      res.status(201).json({
        message: "Reversal created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ReversalController;
