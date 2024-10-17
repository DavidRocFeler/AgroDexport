import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { RoleRepository } from '../roles/roles.repository';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [UsersModule, RolesModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
