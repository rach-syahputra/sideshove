/*
  Warnings:

  - Added the required column `integrity` to the `checkouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkouts" ADD COLUMN     "integrity" TEXT NOT NULL;
