import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from '../config/cloudinary';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[UsersModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig]
})
export class CloudinaryModule {}

