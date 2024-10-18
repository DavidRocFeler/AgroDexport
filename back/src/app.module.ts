import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { AddressesModule } from './addresses/addresses.module';
import { CompanyProductsModule } from './company-products/company-products.module';
import { CategoriesModule } from './categories/categories.module';
import { DiscountsModule } from './discounts/discounts.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TasksModule } from './tasks/tasks.module';
import { EmailsModule } from './emails/emails.module';
import { FarmerCertificationsModule } from './farmer-certifications/farmer-certifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { SupplyChainModule } from './supply-chain/supply-chain.module';
import { JwtModule } from "@nestjs/jwt"
import { PreloadService } from './preloadService';

@Module({
  imports: [
    AuthModule, 
    RolesModule, 
    UsersModule, 
    CompaniesModule, 
    AddressesModule, 
    CompanyProductsModule, 
    CategoriesModule, 
    DiscountsModule, 
    OrdersModule, 
    PaymentsModule, 
    CloudinaryModule, 
    NotificationsModule, 
    TasksModule, 
    EmailsModule, 
    FarmerCertificationsModule, 
    PrismaModule, 
    SupplyChainModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "1h" },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PreloadService],
})
export class AppModule {}
