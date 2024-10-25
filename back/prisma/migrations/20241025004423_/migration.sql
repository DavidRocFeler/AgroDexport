/*
  Warnings:

  - You are about to drop the column `suppy_chain_id` on the `orders` table. All the data in the column will be lost.
  - Made the column `id_company_sell` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_company_sell_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "suppy_chain_id",
ADD COLUMN     "supply_chain_id" TEXT,
ALTER COLUMN "id_company_sell" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_company_buy_fkey" FOREIGN KEY ("id_company_buy") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_company_sell_fkey" FOREIGN KEY ("id_company_sell") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
