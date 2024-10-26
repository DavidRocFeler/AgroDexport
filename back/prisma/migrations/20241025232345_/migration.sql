-- AlterTable
ALTER TABLE "farmer_certifications" ALTER COLUMN "phytosanitary_certificate" DROP NOT NULL,
ALTER COLUMN "agricultural_producer_cert" DROP NOT NULL,
ALTER COLUMN "quality_certificate" DROP NOT NULL,
ALTER COLUMN "certificate_of_origin" DROP NOT NULL;
