/*
  Warnings:

  - You are about to drop the column `supply_chain_id` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "supply_chain_id";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_company_buy_fkey" FOREIGN KEY ("id_company_buy") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
