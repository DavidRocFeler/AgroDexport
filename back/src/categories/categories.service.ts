import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryRepository } from './categories.repository';
import * as categoriesData from '../assets/categories.json';
import { validateExists } from '../helpers/validation.helper';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoryRepository) {}

    async getCategoriesService(): Promise<Category[]> {
        return this.categoriesRepository.getCategories();
    }

    async preloadCategoriesService(): Promise<{ category: string; status: string }[]> {
      const results: { category: string; status: string }[] = [];
    
      for (const categoryData of categoriesData) {
        const existingCategory = await this.categoriesRepository.findCategoryByName(categoryData.name);
    
        if (existingCategory) {
          results.push({ category: categoryData.name, status: 'Already Exists' });
          continue; 
        }

        await this.categoriesRepository.createCategory(categoryData.name);
        results.push({ category: categoryData.name, status: 'Created' });
      }
    
      return results;
    }
}
