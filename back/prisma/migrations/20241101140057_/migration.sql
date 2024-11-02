/*
  Warnings:

  - You are about to drop the column `shipping_address_id` on the `companies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_id]` on the table `shipping_addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `shipping_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_shipping_address_id_fkey";

-- DropIndex
DROP INDEX "companies_shipping_address_id_key";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "shipping_address_id";

-- AlterTable
ALTER TABLE "shipping_addresses" ADD COLUMN     "company_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "shipping_addresses_company_id_key" ON "shipping_addresses"("company_id");

-- AddForeignKey
ALTER TABLE "shipping_addresses" ADD CONSTRAINT "shipping_addresses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
