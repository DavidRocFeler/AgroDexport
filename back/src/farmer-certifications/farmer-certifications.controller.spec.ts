import { Test, TestingModule } from '@nestjs/testing';
import { FarmerCertificationsController } from './farmer-certifications.controller';

describe('FarmerCertificationsController', () => {
  let controller: FarmerCertificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerCertificationsController],
    }).compile();

    controller = module.get<FarmerCertificationsController>(FarmerCertificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
