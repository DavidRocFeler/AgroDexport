import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../users/dtos/loginUser.dto';
import { UsersRepository } from '../users/users.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authRepository: AuthRepository
  ) {}
  
  thirdSingIn() {
      throw new Error('Method not implemented.');
  }
  preloadUsersService() {
      throw new Error('Method not implemented.');
  }

  async signUpService(userData: CreateUserDto): Promise<Omit<User, 'credential_id'>> {
    const newUser = await this.usersRepository.createUser(userData)
    return newUser;
  }


  async signInService(credentials: LoginUserDto) {
    const token = await this.usersRepository.singIn(credentials)
  }

  async passwordRecovery(email: Partial<LoginUserDto>) {
    return this.authRepository.resetPassword(email)
  }
}
