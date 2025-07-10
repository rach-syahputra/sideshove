import { NextFunction, Request, Response } from "express";

import TransactionService from "../services/transaction.service";

class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { page } = req.query;
    try {
      const response = await this.transactionService.getAll({
        page: Number(page) || 1,
      });

      res.status(200).json({
        message: "Transactions retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const {
      requestMethods,
      referenceNumber,
      email,
      amount,
      currency,
      paymentType,
      mobileNumber,
    } = req.body;

    try {
      const response = await this.transactionService.create({
        requestMethods,
        referenceNumber,
        email,
        amount,
        currency,
        paymentType,
        mobileNumber,
      });

      res.status(201).json({
        message: "Payment request created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionController;
