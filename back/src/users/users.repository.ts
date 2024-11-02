
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Credential } from '@prisma/client';
import { validateExists } from '../helpers/validation.helper';
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { RoleRepository } from '../roles/roles.repository';
import { thirdAuthDto } from '../auth/dtos/thirdauth.dto';
import { EmailService } from '../nodemail/nodemail.service';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly notificationService: NotificationsService,
    private readonly rolesRepository: RoleRepository,
    private readonly emailService: EmailService
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        role: { select: { role_name: true } },
        credential: { select: { email: true } },
        companies: {
          select: {
            company_id: true,
            company_name: true,
            country: true,
            products: { select: { company_product_name: true } },
            orders_buyer: { select: { orderDetail: { select: { total: true, order_status: true } } } },
            orders_supplier: { select: { orderDetail: { select: { total: true, order_status: true } } } },
          },
        },
      },
    });
  }

  async getAllWithFiltersAndSorting(filters: any[], sortBy?: string, order: 'asc' | 'desc' = 'asc'): Promise<User[]> {
    // Obtener los usuarios sin aplicar el orden en la consulta
    const users = await this.prisma.user.findMany({
      where: {
        AND: filters,
      },
      include: {
        role: { select: { role_name: true } },
        credential: { select: { email: true } },
        companies: {
          select: {
            company_id: true,
            company_name: true,
            country: true,
            products: { select: { company_product_name: true } },
            orders_buyer: { select: { orderDetail: { select: { total: true, order_status: true } } } },
            orders_supplier: { select: { orderDetail: { select: { total: true, order_status: true } } } },
          },
        },
      },
    });
  
    // Ordenar en memoria según el campo `sortBy`
    if (sortBy === 'products') {
      return users.sort((a, b) => {
        const countA = a.companies.reduce((acc, company) => acc + company.products.length, 0);
        const countB = b.companies.reduce((acc, company) => acc + company.products.length, 0);
        return order === 'asc' ? countA - countB : countB - countA;
      });
    } else if (sortBy === 'totalOrders') {
      return users.sort((a, b) => {
        const totalOrdersA = a.companies.reduce((acc, company) => acc + (company.orders_buyer.length + company.orders_supplier.length), 0);
        const totalOrdersB = b.companies.reduce((acc, company) => acc + (company.orders_buyer.length + company.orders_supplier.length), 0);
        return order === 'asc' ? totalOrdersA - totalOrdersB : totalOrdersB - totalOrdersA;
      });
    }
  
    // Si no se especifica `sortBy`, retornar los usuarios sin ordenar en memoria
    return users;
  }
  
  

  async findUsersWithIncompleteProfiles(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { nDni: null },
          { birthday: null },
          { phone: null },
          { country: null },
          { profile_picture: null },
        ],
      },
    });
  }
  

  async getUserById(user_id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
        where: { user_id },
        include: {
            companies: true, 
        },
    });

    if (!user) {
        throw new NotFoundException('User not found');
    }
    return user;
}


  async createUser(userData: Partial<CreateUserDto>): Promise<User> {
    const { user_name, user_lastname, role_name, isOlder, email, password } = userData;
    const role = await this.rolesRepository.getRoleByName(role_name);
  
    if (role) {

      const existingUser = await this.prisma.credential.findUnique({ where: { email } });
  
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newAccount = await this.prisma.credential.create({
          data: {
            email: email,
            password: hashedPassword,
          },
        });
  
        const newUser = await this.prisma.user.create({
          data: {
            user_name: user_name,
            user_lastname: user_lastname,
            isOlder: isOlder,
            role_id: role.role_id, 
            credential_id: newAccount.credential_id,
          },
        });

        await this.emailService.sendRegistrationEmail(
          userData.email, 
          'Welcome to AgroDexports', 
          userData.user_name,
          userData.role_name
        );

        return newUser;
      }
      throw new BadRequestException('The email is already in use');
    }

    throw new NotFoundException('The role is not found');
  }

  

  async createUserThird(userData: thirdAuthDto): Promise<User> {
    let user = await this.findUserByEmail(userData.email);

    if (user){
      throw new BadRequestException('The email is already in use')
    }
  
    if (!user) {
      const role = await this.rolesRepository.getRoleByName(userData.role_name);
  
      if (!role) {
        throw new BadRequestException('El rol especificado no existe');
      }
  
      const randomPassword = Math.random().toString(36).slice(-12);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      const credential = await this.prisma.credential.create({
        data: {
          email: userData.email,
          password: hashedPassword,
        },
      });
  
      user = await this.prisma.user.create({
        data: {
          user_name: userData.name,
          user_lastname: ' ',
          role_id: role.role_id,
          isOlder: true,
          credential_id: credential.credential_id,
        },
      });
    }

    await this.emailService.sendRegistrationEmail(
      userData.email, 
      'Welcome to AgroDexports', 
      userData.name,
      userData.role_name,
    );
  
    return user;
  }
  
  
  

  async singIn(credentials: LoginUserDto) {
    const { email, password } = credentials;
    const account = await this.findCredentialByEmail(email);
    
    if (account) {
      if (!account.user.isActive) {
        throw new UnauthorizedException("Account is inactive. Please contact support.");
      }
  
      const user = await this.prisma.user.findUnique({
        where: { credential_id: account.credential_id },
        include: { role: true },
      });
  
      const userId = user.user_id;
      const accountPassword = account.password;
      const isPasswordValid = await bcrypt.compare(password, accountPassword);
  
      if (isPasswordValid) {
        const userPayload = {
          sub: userId,
          user_id: userId,
          user_name: user.user_name,
          role: user.role.role_name,
        };
  
        const token = this.jwtService.sign(userPayload);
        return {
          token,
          user_id: userId,
          role_name: user.role.role_name,
        };
      }
    } else {
      throw new BadRequestException("Your password or Email is incorrect");
    }
  }

  async findCredentialByEmail(email: string) {
    return this.prisma.credential.findUnique({
      where: { email },
      include: {
        user: {
          select: {
            user_id: true,
            isActive: true,  
            role: {
              select: {
                role_name: true,
              },
            },
          },
        },
      },
    });
  }
  

  async findUserByCredentialId(credential_id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { credential_id },
      include: { role: true },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const credential = await this.prisma.credential.findUnique({
      where: { email },
      include: { user: true },
    });
    return credential?.user || null;
  }


  async updateUser(id: string, updateData: Partial<User & { password?: string }>): Promise<User> {
    try {
      const user = await this.getUserById(id);
  
      if (updateData.password) {
        const hashedPassword = await bcrypt.hash(updateData.password, 10);
        await this.prisma.credential.update({
          where: { credential_id: user.credential_id },
          data: { password: hashedPassword },
        });

        delete updateData.password;
      }
      
      if ('confirm_password' in updateData) {
        delete updateData.confirm_password;
      }

      const updatedUser = await this.prisma.user.update({
        where: { user_id: id },
        data: updateData,
      });

      await this.notificationService.createAndNotifyUser(
        id, 
        'Your user data has been updated', 'UserUpdate'
      );
  
      return updatedUser;

    } catch (error) {
      if (error.code === 'P2002') { // Prisma usa P2002 para violación de restricciones únicas
        throw new ConflictException('El email ya está en uso');
      }
      throw error;
    }
  }

      async deleteUser(user_id: string): Promise<void> {
          await this.prisma.$transaction(async (prisma) => {
              // Eliminar productos de las compañías del usuario
              await prisma.companyProduct.deleteMany({
                  where: {
                      company: {
                          user_id,
                      },
                  },
              });
  
              // Eliminar direcciones de envío de las compañías del usuario
              await prisma.shippingAddress.deleteMany({
                  where: {
                      company: {
                          user_id,
                      },
                  },
              });
  
              // Eliminar pedidos (Order) asociados a las compañías del usuario como comprador o vendedor
              await prisma.order.deleteMany({
                  where: {
                      OR: [
                          { id_company_buy: user_id },
                          { id_company_sell: user_id },
                      ],
                  },
              });
  
              // Eliminar las compañías del usuario
              await prisma.company.deleteMany({
                  where: {
                      user_id,
                  },
              });
  
              // Eliminar notificaciones asociadas al usuario
              await prisma.notification.deleteMany({
                  where: {
                      user_id,
                  },
              });
  
              // Eliminar la comisión asociada al usuario (si existe)
              await prisma.commission.delete({
                  where: {
                      user_id,
                  },
              }).catch(() => {
                  // Si la comisión no existe, ignora el error
              });
  
              // Eliminar las credenciales del usuario
              await prisma.credential.delete({
                  where: {
                      credential_id: user_id,
                  },
              }).catch(() => {
                  // Si las credenciales no existen, ignora el error
              });
  
              // Finalmente, eliminar el usuario
              await prisma.user.delete({
                  where: {
                      user_id,
                  },
              });
          });
      }
  
}