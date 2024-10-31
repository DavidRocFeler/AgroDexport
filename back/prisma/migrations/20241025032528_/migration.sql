-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "supply_chain_id" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_supply_chain_id_fkey" FOREIGN KEY ("supply_chain_id") REFERENCES "supply_chain"("supply_chain_id") ON DELETE SET NULL ON UPDATE CASCADE;
