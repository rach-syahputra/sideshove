import { Router } from "express";
import CaptureController from "../controllers/capture.controller";

class CaptureRoute {
  private router: Router;
  private captureController: CaptureController;

  constructor() {
    this.captureController = new CaptureController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/:paymentId", this.captureController.create);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default CaptureRoute;
