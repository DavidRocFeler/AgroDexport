import { Module } from '@nestjs/common';
import { FarmerCertificationsController } from './farmer-certifications.controller';
import { FarmerCertificationsService } from './farmer-certifications.service';

@Module({
  controllers: [FarmerCertificationsController],
  providers: [FarmerCertificationsService]
})
export class FarmerCertificationsModule {}
