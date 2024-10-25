import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderProductsDto } from "./dtos/createOrderProducts.dto";
export declare class OrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrderProductsRepository(createOrderProductsDto: CreateOrderProductsDto): void;
}
