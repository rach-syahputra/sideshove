import { Router } from "express";
import TransactionController from "../controllers/transaction.controller";

class TransactionRoute {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.transactionController.getAll);
    this.router.get("/:transactionId", this.transactionController.get);
    this.router.post("/", this.transactionController.create);
    this.router.put("/:transactionId", this.transactionController.update);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default TransactionRoute;
