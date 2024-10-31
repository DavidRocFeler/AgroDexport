import { Module } from '@nestjs/common';
import { WebhookController } from './payments.controller';
import { PaymentService } from './payments.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WebhookController],
  providers: [PaymentService]
})
export class PaymentsModule {}
