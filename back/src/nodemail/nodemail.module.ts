import { Module } from '@nestjs/common';
import { EmailService } from './nodemail.service';


@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
