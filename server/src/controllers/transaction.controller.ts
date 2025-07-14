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

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.params;
    try {
      const response = await this.transactionService.get({
        transactionId,
      });

      res.status(200).json({
        message: "Transaction detail retrieved successfully",
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
      paymentFrequency,
      initialPaymentAmount,
      paymentStartDate,
      paymentEndDate,
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
        paymentFrequency,
        initialPaymentAmount,
        paymentStartDate,
        paymentEndDate,
      });

      res.status(201).json({
        message: "Payment request created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.params;
    const {
      referenceNumber,
      requestMethods,
      email,
      amount,
      currency,
      paymentType,
      mobileNumber,
    } = req.body;

    try {
      const response = await this.transactionService.update({
        transactionId,
        requestMethods,
        referenceNumber,
        email,
        amount,
        currency,
        paymentType,
        mobileNumber,
      });

      res.status(200).json({
        message: "Payment request updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.params;

    try {
      const response = await this.transactionService.delete({
        transactionId,
      });

      res.status(200).json({
        message: "Payment request deleted successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionController;
