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

  async thirdSignupService(userData: thirdAuthDto): Promise<User> {
    const newUser = await this.usersRepository.createUserThird(userData)
    return newUser;
  }


  async signInService(credentials: LoginUserDto) {
    const token = await this.usersRepository.singIn(credentials)
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
      
      const existingUser = await this.usersRepository.findUserByEmail(userData.email);
  
      if (existingUser) {
        results.push({ user: userData.email, status: 'Already Exists' });
        continue;
      }
      await this.usersRepository.createUser(userData);
      results.push({ user: userData.email, status: 'Created' });
    }
  
    return results;
  }
  
}
