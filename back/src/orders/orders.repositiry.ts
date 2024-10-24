import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderProductsDto } from "./dtos/createOrderProducts.dto";


@Injectable()
export class OrderRepository {
    

    constructor (private readonly prisma: PrismaService){}

    createOrderProductsRepository(createOrderProductsDto: CreateOrderProductsDto) {
               
    }

}