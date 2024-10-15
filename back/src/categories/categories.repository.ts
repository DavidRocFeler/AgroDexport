import { Injectable } from '@nestjs/common';
import { validateExists } from '../helpers/validation.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}


    async getCategories(): Promise<Category[]> {
            const categories = await this.prisma.category.findMany();
            return categories;

    }

    async findCategoryByName(name: string): Promise<Category | null> {
        return await this.prisma.category.findUnique({
          where: { name_category: name },
        });
      }
    
      async createCategory(name: string): Promise<Category> {
        return await this.prisma.category.create({
          data: { name_category: name },
        });
      }
}
