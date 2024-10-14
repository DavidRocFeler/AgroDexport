import { Test, TestingModule } from '@nestjs/testing';
import { SupplyChainController } from './supply-chain.controller';

describe('SupplyChainController', () => {
  let controller: SupplyChainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplyChainController],
    }).compile();

    controller = module.get<SupplyChainController>(SupplyChainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
