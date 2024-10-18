import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from '../config/cloudinary';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports:[UsersModule, CompaniesModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig]
})
export class CloudinaryModule {}

