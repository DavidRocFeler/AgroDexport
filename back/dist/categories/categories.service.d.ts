import { Category } from '@prisma/client';
import { CategoryRepository } from './categories.repository';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoryRepository);
    getCategoriesService(): Promise<Category[]>;
    preloadCategoriesService(): Promise<{
        category: string;
        status: string;
    }[]>;
}
