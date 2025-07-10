import { Router } from "express";
import PaymentController from "../controllers/payment.controller";

class PaymentRoute {
  private router: Router;
  private paymentController: PaymentController;

  constructor() {
    this.paymentController = new PaymentController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.paymentController.getAll);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default PaymentRoute;
