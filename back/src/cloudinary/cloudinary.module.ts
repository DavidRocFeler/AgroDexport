import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from '../config/cloudinary';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig]
})
export class CloudinaryModule {}

