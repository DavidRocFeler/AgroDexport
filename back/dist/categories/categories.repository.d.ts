import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';
export declare class CategoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCategories(): Promise<Category[]>;
    findCategoryByName(name: string): Promise<Category | null>;
    createCategory(name: string): Promise<Category>;
    findByIdcategory(id: string): Promise<Category>;
}
