import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import querystring from "querystring";
import { prisma } from "./utils/prisma";
import { STATUS } from "@prisma/client";

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
      // create payment
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

      // store checkout data
      await prisma.checkout.create({
        data: {
          id: json.id,
          amount,
          currency: "EUR",
          integrity: json.integrity,
          status: "PENDING",
        },
      });

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
    try {
      const { id } = req.params;

      const checkout = await prisma.checkout.findUnique({
        where: {
          id,
        },
      });

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

      const data = await response.json();

      // update payment status to expired if it's not paid more than 30 minutes
      if (
        checkout &&
        data.result.code !== "000.200.000" &&
        checkout?.status !== "SUCCESS"
      ) {
        await prisma.checkout.update({
          where: {
            id: checkout?.id,
          },
          data: {
            status: "EXPIRED",
          },
        });
      }

      res.status(200).json({
        message: "Payment status retrieved successfully",
        data: { ...data, checkout },
      });
    } catch (error) {
      console.error(error);
    }
  }
);

// update payment status
app.patch(
  "/api/checkouts/:id/payment",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status, currency, brand, holder } = req.body;

      const checkout = await prisma.checkout.update({
        where: {
          id,
        },
        data: {
          status: status as STATUS,
          currency,
          brand,
          holder,
          paidAt: status === "SUCCESS" ? new Date() : null,
        },
      });

      res.status(200).json({
        message: "Payment updated successfully",
        data: checkout,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

// get checkouts data
app.get(
  "/api/checkouts",
  async (req: Request, res: Response, next: NextFunction) => {
    const checkouts = await prisma.checkout.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    try {
      const response = await Promise.all(
        checkouts.map(async (checkout) => {
          const res = await fetch(
            `https://eu-test.oppwa.com/v1/checkouts/${checkout.id}/payment?entityId=8ac7a4c79394bdc801939736f17e063d`,
            {
              method: "GET",
              headers: {
                Authorization:
                  "Bearer OGFjN2E0Yzc5Mzk0YmRjODAxOTM5NzM2ZjFhNzA2NDF8enlac1lYckc4QXk6bjYzI1NHNng=",
              },
            }
          );

          const data = await res.json();

          // update payment status to expired if it's not paid more than 30 minutes
          if (
            data.result.code !== "000.200.000" &&
            checkout.status !== "SUCCESS"
          ) {
            await prisma.checkout.update({
              where: {
                id: checkout.id,
              },
              data: {
                status: "EXPIRED",
              },
            });
          }

          return {
            ...checkout,
          };
        })
      );

      res.status(200).json({
        message: "Orders retrieved successfully",
        data: response,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
