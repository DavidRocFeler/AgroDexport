-- AlterTable
ALTER TABLE "shipping_addresses" ALTER COLUMN "contact_name" DROP NOT NULL,
ALTER COLUMN "contact_lastname" DROP NOT NULL,
ALTER COLUMN "contact_email" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "postal_code" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL;
