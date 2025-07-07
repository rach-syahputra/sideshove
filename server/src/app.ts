import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import querystring from "querystring";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

// create checkout
app.post(
  "/api/checkouts",
  async (req: Request, res: Response, next: NextFunction) => {
    const { amount } = req.body;
    const data = querystring.stringify({
      entityId: "8ac7a4c79394bdc801939736f17e063d",
      amount: String(amount),
      currency: "EUR",
      paymentType: "DB",
      integrity: "true",
    });

    try {
      const response = await fetch("https://eu-test.oppwa.com/v1/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer OGFjN2E0Yzc5Mzk0YmRjODAxOTM5NzM2ZjFhNzA2NDF8enlac1lYckc4QXk6bjYzI1NHNng=",
        },
        body: data,
      });

      const json = await response.json();
      res.status(200).json({
        message: "Payment created successfully",
        data: json,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

// check checkout status
app.get(
  "/api/checkouts/:id/payment",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const response = await fetch(
        `https://eu-test.oppwa.com/v1/checkouts/${id}/payment?entityId=8ac7a4c79394bdc801939736f17e063d`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer OGFjN2E0Yzc5Mzk0YmRjODAxOTM5NzM2ZjFhNzA2NDF8enlac1lYckc4QXk6bjYzI1NHNng=",
          },
        }
      );

      const json = await response.json();
      res.status(200).json({
        message: "Payment status retrieved successfully",
        data: json,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
