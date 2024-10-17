import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./createCategory.dto";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<{
        category_id: string;
        name_category: string;
    }[]>;
    preloadCategories(categoryData: CreateCategoryDto): Promise<{
        category: string;
        status: string;
    }[]>;
}
