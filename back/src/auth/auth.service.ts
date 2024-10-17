import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../users/dtos/loginUser.dto';
import { validateExists } from '../helpers/validation.helper';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/createUser.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUpService(userData: CreateUserDto): Promise<Omit<User, 'credential_id'>> {
    const user: Partial<User> = {
      user_name: userData.user_name,
      user_lastname: userData.user_lastname,
      nDni: userData.nDni,
      birthday: userData.birthday,
      phone: userData.phone,
      country: userData.country,
      role_id: userData.role_id,
    };
    const newUser = await this.usersRepository.createUser(user as User, userData.email, userData.password);
    return newUser;
  }


  async signInService(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const credential = await this.usersRepository.findCredentialByEmail(email);
    validateExists(credential, 'notExists', 'Incorrect credentials');

    if (credential.password !== password) {
      throw new UnauthorizedException('Incorrect credentials');
    }
    const user = await this.usersRepository.findUserByCredentialId(credential.credential_id);
    validateExists(user, 'notExists', 'User not found');

    return { message: 'Login successful', user };
  }
}
