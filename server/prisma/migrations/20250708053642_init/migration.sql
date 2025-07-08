/*
  Warnings:

  - Added the required column `amount` to the `checkouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkouts" ADD COLUMN     "amount" INTEGER NOT NULL;
