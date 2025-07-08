import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import querystring from "querystring";
import { prisma } from "./utils/prisma";
import { PaymentType } from "@prisma/client";

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

// create payment
app.post(
  "/api/payments",
  async (req: Request, res: Response, next: NextFunction) => {
    const { amount, brand, number, holder, expiryMonth, expiryYear, cvv } =
      req.body;
    const { paymentType } = req.query;
    const data = querystring.stringify({
      entityId: "8ac7a4c79394bdc801939736f17e063d",
      amount: String(amount),
      currency: "EUR",
      paymentBrand: brand,
      paymentType: (paymentType as string) || "PA",
      "card.number": number,
      "card.holder": holder,
      "card.expiryMonth": expiryMonth,
      "card.expiryYear": expiryYear,
      "card.cvv": cvv,
    });

    try {
      // create payment
      const response = await fetch("https://eu-test.oppwa.com/v1/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer OGFjN2E0Yzc5Mzk0YmRjODAxOTM5NzM2ZjFhNzA2NDF8enlac1lYckc4QXk6bjYzI1NHNng=",
        },
        body: data,
      });

      const json = await response.json();

      // store paid payment data
      if (json.result.code === "000.100.110") {
        await prisma.payment.create({
          data: {
            id: json.id,
            amount,
            currency: "EUR",
            status: "PAID",
            type: (paymentType as PaymentType) || "PA",
            brand,
          },
        });
      }

      res.status(200).json({
        message: "Payment created successfully",
        data: json,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

// get payments
app.get(
  "/api/payments",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await prisma.payment.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      res.status(200).json({
        message: "Payments retrieved successfully",
        data: payments,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

// capture payment
app.post(
  "/api/payments/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { paymentType } = req.query;
    const { amount } = req.body;

    const data = querystring.stringify({
      entityId: "8ac7a4c79394bdc801939736f17e063d",
      amount: String(amount),
      currency: "EUR",
      paymentType: (paymentType as string) || "CP",
    });

    try {
      // create payment
      const response = await fetch(
        `https://eu-test.oppwa.com/v1/payments/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer OGFjN2E0Yzc5Mzk0YmRjODAxOTM5NzM2ZjFhNzA2NDF8enlac1lYckc4QXk6bjYzI1NHNng=",
          },
          body: data,
        }
      );

      const json = await response.json();

      // create new captured payment
      if (json.result.code === "000.100.110") {
        const payment = await prisma.payment.findUnique({
          where: {
            id,
          },
        });

        await prisma.payment.create({
          data: {
            id: json.id,
            referencedId: id,
            amount,
            status: "CAPTURED",
            type: "CP",
            brand: payment?.brand,
          },
        });
      }

      res.status(200).json({
        message: "Payment captured successfully",
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
