import express, { Express, Request, Response } from "express";
import cors from "cors";

// routes
import PaymentRoute from "./routes/payment.route";
import { PORT } from "./config";

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
    const paymentRoute = new PaymentRoute();

    this.app.use("/api/payments", paymentRoute.getRouter());
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
