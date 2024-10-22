-- AlterTable
ALTER TABLE "shipping_addresses" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "contact_phone" DROP NOT NULL,
ALTER COLUMN "delivery_hours" DROP NOT NULL;
