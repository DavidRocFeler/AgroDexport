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
import { FarmerCertificationsModule } from './farmer-certifications/farmer-certifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { SupplyChainModule } from './supply-chain/supply-chain.module';
import { JwtModule } from "@nestjs/jwt"
import { PreloadService } from './preloadService';
import { EmailModule } from './nodemail/nodemail.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { BigIntInterceptor } from './interceptors/bigint.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
    EmailModule, 
    FarmerCertificationsModule, 
    PrismaModule, 
    SupplyChainModule,
    ChatbotModule,
    JwtModule.register({
      global: true,
      // signOptions: { expiresIn: "4h" },
      secret: process.env.JWT_SECRET,
    }),
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PreloadService,
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntInterceptor,
    },
  ],
})
export class AppModule {}
