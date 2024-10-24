import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './orders.repositiry';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository]
})
export class OrdersModule {}
