/*
  Warnings:

  - You are about to drop the column `supply_chain_id` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_company_buy_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_company_sell_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_order_details_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipping_address_id_fkey";

-- DropForeignKey
ALTER TABLE "supply_chain" DROP CONSTRAINT "supply_chain_order_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "supply_chain_id";

-- AddForeignKey
ALTER TABLE "supply_chain" ADD CONSTRAINT "supply_chain_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;
