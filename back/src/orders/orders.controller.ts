import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderProductsDto } from './dtos/createOrderProducts.dto';
import { OrdersService } from './orders.service';

@ApiTags("Orders")
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}


    @Post()
    async createOrderProducts(@Body() createOrderProductsDto: CreateOrderProductsDto){
        return this.orderService.createOrderProductsServices(createOrderProductsDto)
    }


}

