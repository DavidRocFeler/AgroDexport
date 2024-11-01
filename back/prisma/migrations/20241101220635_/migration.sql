/*
  Warnings:

  - You are about to alter the column `tax_identification_number` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "tax_identification_number" SET DATA TYPE INTEGER;
