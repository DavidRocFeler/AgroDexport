/*
  Warnings:

  - You are about to drop the column `orders_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `notifications_id` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "orders_id",
ADD COLUMN     "order_id" TEXT;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "notifications_id",
ADD COLUMN     "payment_id" TEXT;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount_decimal" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "payment_provider" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "payer_id" TEXT NOT NULL,
    "description" TEXT,
    "payment_method" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_company_id_key" ON "payments"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_payment_id_key" ON "orders"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_role_id_key" ON "users"("role_id");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("payment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
