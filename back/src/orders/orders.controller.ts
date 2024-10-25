import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderProductsDto } from './dtos/createOrderProducts.dto';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';

@ApiTags("Orders")
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}


    @Get()
    async getAllOrders(): Promise<Order[]>{
        return this.orderService.getAllOrdersServices()
    }

    @Post()
    async createOrderProducts(@Body() createOrderProductsDto: CreateOrderProductsDto){
        return this.orderService.createOrderProductsServices(createOrderProductsDto)
    }


}

