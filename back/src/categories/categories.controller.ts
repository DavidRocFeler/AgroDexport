import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./createCategory.dto";
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}


    @HttpCode(200)
    @Get()
    async getCategories() {
        return this.categoriesService.getCategoriesService();
    }

    @Post("sedeer")
    @ApiExcludeEndpoint()
    async preloadCategories(@Body() categoryData: CreateCategoryDto){
        return this.categoriesService.preloadCategoriesService();
    }
}
