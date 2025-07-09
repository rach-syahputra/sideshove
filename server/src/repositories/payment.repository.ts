import { prisma } from "../utils/prisma";
import {
  CreatePaymentRepositoryRequest,
  GetAllPaymentRequest,
  UpdatePaymentRepositoryRequest,
} from "../types/payment";

class PaymentRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  create = async (req: CreatePaymentRepositoryRequest) => {
    return await prisma.payment.create({
      data: {
        id: req.id,
        amount: req.amount,
        currency: req.currency,
        status: req.status,
        type: req.type,
        brand: req.brand,
      },
    });
  };

  getAll = async (req: GetAllPaymentRequest) => {
    return await prisma.payment.findMany({
      where: {
        ...(req.type && { type: req.type }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  };

  update = async (req: UpdatePaymentRepositoryRequest) => {
    const payment = await prisma.payment.findUnique({
      where: {
        id: req.referencedId,
      },
    });

    if (req.type === "CP") {
      // update referenced payment status
      await prisma.payment.update({
        where: {
          id: req.referencedId,
        },
        data: {
          status: "CAPTURED",
        },
      });

      // create captured payment
      await prisma.payment.create({
        data: {
          id: req.newPaymentId,
          referencedId: req.referencedId,
          amount: req.amount,
          status: "CAPTURED",
          type: "CP",
          brand: payment?.brand,
        },
      });
    }

    if (req.type === "RF") {
      // update referenced payment status
      await prisma.payment.update({
        where: {
          id: req.referencedId,
        },
        data: {
          status: "REFUNDED",
        },
      });

      // create refunded payment
      await prisma.payment.create({
        data: {
          id: req.newPaymentId,
          referencedId: req.referencedId,
          amount: req.amount,
          status: "REFUNDED",
          type: "RF",
          brand: payment?.brand,
        },
      });
    }
  };
}

export default PaymentRepository;
