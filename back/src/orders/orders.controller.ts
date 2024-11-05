import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderProductsDto } from './dtos/createOrderProducts.dto';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/RolesGuard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags("Orders")
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}


    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    async getAllOrders(): Promise<Order[]>{
        return this.orderService.getAllOrdersServices()
    }



    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'buyer')
    @Get(":id")
    async getOrderById(@Param("id") orderId: string){
        return await this.orderService.getOrderByIdService(orderId);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'buyer', "supplier")
    @Get("companies/:id")
    async getOrdersByCompanyId(@Param("id") companyId: string ):Promise<Order[]>{
        return await this.orderService.getOrdersByCompanyIdServices(companyId);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'buyer', "supplier")
    @Get("companies/order/:id")
    async getInfoOrderByOderDetailId(@Param("id") ordeDatailId: string ){
        return await this.orderService.getInfoOrderByOderDetailIdServices(ordeDatailId);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'buyer')
    @Post()
    async createOrderProducts(@Body() createOrderProductsDto: CreateOrderProductsDto){
        return this.orderService.createOrderProductsServices(createOrderProductsDto)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'buyer')
    @Put(":id")
    async updateOrderSatus(@Param("id") orderId: string){
        return await this.orderService.updateOderStatusService(orderId)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'buyer') 
    @Delete(":id")
    async softDeleteOrder(@Param("id") orderId: string){
        return await this.orderService.softDleteOrderService(orderId)
    }


}

