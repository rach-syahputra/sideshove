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
    this.router.post("/", this.paymentController.create);
    this.router.get("/", this.paymentController.getAll);
    this.router.post("/:id", this.paymentController.update);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default PaymentRoute;
