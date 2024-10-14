import { Module } from '@nestjs/common';
import { SupplyChainController } from './supply-chain.controller';
import { SupplyChainService } from './supply-chain.service';

@Module({
  controllers: [SupplyChainController],
  providers: [SupplyChainService]
})
export class SupplyChainModule {}
