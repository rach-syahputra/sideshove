import { Router } from "express";
import ReversalController from "../controllers/reversal.controller";

class ReversalRoute {
  private router: Router;
  private reversalController: ReversalController;

  constructor() {
    this.reversalController = new ReversalController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/:paymentId", this.reversalController.create);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default ReversalRoute;
