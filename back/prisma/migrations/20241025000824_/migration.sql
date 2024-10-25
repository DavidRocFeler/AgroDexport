-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_company_sell_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "id_company_sell" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_company_sell_fkey" FOREIGN KEY ("id_company_sell") REFERENCES "companies"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;
