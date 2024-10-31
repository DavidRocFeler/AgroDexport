-- DropIndex
DROP INDEX "orders_shipping_address_id_key";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("payment_id") ON DELETE CASCADE ON UPDATE CASCADE;
