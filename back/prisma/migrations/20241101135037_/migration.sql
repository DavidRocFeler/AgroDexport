/*
  Warnings:

  - You are about to drop the column `company_id` on the `shipping_addresses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shipping_address_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "shipping_addresses" DROP CONSTRAINT "shipping_addresses_company_id_fkey";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "shipping_address_id" TEXT;

-- AlterTable
ALTER TABLE "shipping_addresses" DROP COLUMN "company_id";

-- CreateIndex
CREATE UNIQUE INDEX "companies_shipping_address_id_key" ON "companies"("shipping_address_id");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "shipping_addresses"("shipping_address_id") ON DELETE SET NULL ON UPDATE CASCADE;
