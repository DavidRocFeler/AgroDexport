import { OnModuleInit } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
export declare class PreloadService implements OnModuleInit {
    private readonly categoryService;
    constructor(categoryService: CategoriesService);
    onModuleInit(): Promise<void>;
}
