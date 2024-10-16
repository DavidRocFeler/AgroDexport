import { Test, TestingModule } from '@nestjs/testing';
import { FarmerCertificationsService } from './farmer-certifications.service';

describe('FarmerCertificationsService', () => {
  let service: FarmerCertificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmerCertificationsService],
    }).compile();

    service = module.get<FarmerCertificationsService>(FarmerCertificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
