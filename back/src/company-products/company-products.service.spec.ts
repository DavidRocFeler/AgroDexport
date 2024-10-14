import { Test, TestingModule } from '@nestjs/testing';
import { CompanyProductsService } from './company-products.service';

describe('CompanyProductsService', () => {
  let service: CompanyProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyProductsService],
    }).compile();

    service = module.get<CompanyProductsService>(CompanyProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
