/*
  Warnings:

  - You are about to drop the column `paid_at` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paid_at",
ADD COLUMN     "referencedId" TEXT;
