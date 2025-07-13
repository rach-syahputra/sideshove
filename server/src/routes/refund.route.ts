import { Router } from "express";
import RefundController from "../controllers/refund.controller";

class RefundRoute {
  private router: Router;
  private refundController: RefundController;

  constructor() {
    this.refundController = new RefundController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/:paymentId", this.refundController.create);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default RefundRoute;
