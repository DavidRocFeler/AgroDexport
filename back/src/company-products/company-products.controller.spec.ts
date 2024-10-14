import { Test, TestingModule } from '@nestjs/testing';
import { CompanyProductsController } from './company-products.controller';

describe('CompanyProductsController', () => {
  let controller: CompanyProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyProductsController],
    }).compile();

    controller = module.get<CompanyProductsController>(CompanyProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
