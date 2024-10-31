/*
  Warnings:

  - A unique constraint covering the columns `[shipping_address_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orders_shipping_address_id_key" ON "orders"("shipping_address_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "shipping_addresses"("shipping_address_id") ON DELETE CASCADE ON UPDATE CASCADE;
