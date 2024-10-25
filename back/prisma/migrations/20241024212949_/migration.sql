/*
  Warnings:

  - You are about to drop the column `id_payments` on the `orders` table. All the data in the column will be lost.
  - Added the required column `id_company_buy` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "id_payments",
ADD COLUMN     "id_company_buy" TEXT NOT NULL;
