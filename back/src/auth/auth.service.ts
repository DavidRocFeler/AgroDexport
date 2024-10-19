import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserDto } from '../users/dtos/loginUser.dto';
import { UsersRepository } from '../users/users.repository';
import { User } from '@prisma/client';
import * as usersData from '../assets/users.json';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { RoleRepository } from '../roles/roles.repository';
import { AuthRepository } from './auth.repository';
import { thirdAuthDto } from './dtos/thirdauth.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RoleRepository,
    private readonly authRepository: AuthRepository 
  ) {}

  async signUpService(userData: CreateUserDto): Promise<Omit<User, 'credential_id'>> {
    const newUser = await this.usersRepository.createUser(userData)
    return newUser;
  }


  async signInService(credentials: LoginUserDto) {
    const token = await this.usersRepository.singIn(credentials)
    console.log(token)
    return token
  }

  async passwordRecovery(email: Partial<LoginUserDto>) {
    return this.authRepository.resetPassword(email)
  }

  async thirdSingIn(userData: thirdAuthDto) {
    console.log(userData)
    return await this.authRepository.thirdSingIn(userData)
  }

  async preloadUsersService(): Promise<{ user: string; status: string }[]> {
    const results: { user: string; status: string }[] = [];
  
    for (const userData of usersData) {
      const role = await this.rolesRepository.getRoleByName(userData['role']);
  
      if (!role) {
        results.push({ user: userData.email, status: `Role ${userData['role']} not found` });
        continue;
      }
      
      const existingUser = await this.usersRepository.findUserByEmail(userData.email);
  
      if (existingUser) {
        results.push({ user: userData.email, status: 'Already Exists' });
        continue;
      }
      const userWithRoleId = { ...userData, role_id: role.role_id };
      await this.usersRepository.createUser(userWithRoleId);
      results.push({ user: userData.email, status: 'Created' });
    }
  
    return results;
  }
  
}
