import { Module } from '@nestjs/common';
import { CompanyController } from './companies.controller';
import { CompanyService } from './companies.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [UsersModule],
  exports: [CompanyService]
})
export class CompaniesModule {}
