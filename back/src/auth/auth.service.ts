import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../users/loginUser.dto';
import { validateExists } from '../helpers/validation.helper';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/createUser.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUpService(userData: CreateUserDto): Promise<Omit<User, 'password'>> {

    const user: Partial<User> = {
      user_name:  userData.user_name,
      user_lastname: userData.user_lastname,
      email: userData.email,
      password: userData.password,
      nDni: userData.nDni,
      birthday: userData.birthday,
      phone: userData.phone,
      country: userData.country,
      role_id: userData.role_id,
    };

    const newUser = await this.usersRepository.createUser(user as User);
    return newUser;
  }

  async signInService(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findEmail(email);
    validateExists(user, 'notExists', 'Incorrect credentials');

    if (user.password !== password) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    return { message: 'Login successful' };
  }
}
