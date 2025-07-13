import { NextFunction, Request, Response } from "express";

import CaptureService from "../services/capture.service";

class CaptureController {
  private captureService: CaptureService;

  constructor() {
    this.captureService = new CaptureService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { paymentId } = req.params;
    const { email, mobileNumber, amount } = req.body;

    try {
      const response = await this.captureService.create({
        paymentId,
        amount: Number(amount),
      });

      res.status(201).json({
        message: "Capture created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CaptureController;
