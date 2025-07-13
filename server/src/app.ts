import express, { Express, Request, Response } from "express";
import cors from "cors";
import { PORT } from "./config";

// routes
import TransactionRoute from "./routes/transaction.route";
import PaymentRoute from "./routes/payment.route";
import RefundRoute from "./routes/refund.route";
import CaptureRoute from "./routes/capture.route";

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    const transactionRoute = new TransactionRoute();
    const paymentRoute = new PaymentRoute();
    const refundRoute = new RefundRoute();
    const captureRoute = new CaptureRoute();

    this.app.use("/api/transactions", transactionRoute.getRouter());
    this.app.use("/api/payments", paymentRoute.getRouter());
    this.app.use("/api/refunds", refundRoute.getRouter());
    this.app.use("/api/captures", captureRoute.getRouter());
    this.app.get("/api", (req: Request, res: Response) => {
      res.status(200).json({
        message: "Sideshove API service",
      });
    });
  }
  public getServer(): Express {
    return this.app;
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
