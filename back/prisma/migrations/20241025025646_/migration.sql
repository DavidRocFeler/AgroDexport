/*
  Warnings:

  - A unique constraint covering the columns `[order_details_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "supply_chain" DROP CONSTRAINT "supply_chain_order_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_details_id_key" ON "orders"("order_details_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_company_sell_fkey" FOREIGN KEY ("id_company_sell") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_order_details_id_fkey" FOREIGN KEY ("order_details_id") REFERENCES "order_details"("order_details_id") ON DELETE CASCADE ON UPDATE CASCADE;
