-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PENDING', 'SUCCESS', 'EXPIRED');

-- CreateTable
CREATE TABLE "checkouts" (
    "id" TEXT NOT NULL,
    "integrity" TEXT NOT NULL,
    "status" "STATUS" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkouts_pkey" PRIMARY KEY ("id")
);
