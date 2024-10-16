"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const categories_repository_1 = require("./categories.repository");
const categoriesData = require("../assets/categories.json");
const validation_helper_1 = require("../helpers/validation.helper");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async getCategoriesService() {
        return this.categoriesRepository.getCategories();
    }
    async preloadCategoriesService() {
        const results = [];
        for (const categoryData of categoriesData) {
            const existingCategory = await this.categoriesRepository.findCategoryByName(categoryData.name);
            (0, validation_helper_1.validateExists)(existingCategory, 'exists', `Category ${categoryData.name} already exists`);
            await this.categoriesRepository.createCategory(categoryData.name);
            results.push({ category: categoryData.name, status: 'Created' });
        }
        return results;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categories_repository_1.CategoryRepository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map