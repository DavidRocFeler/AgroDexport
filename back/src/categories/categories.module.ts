import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './categories.repository';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  exports: [CategoriesService]
})
export class CategoriesModule {}
