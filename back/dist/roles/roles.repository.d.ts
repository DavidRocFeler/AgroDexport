import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dtos/createRole.dto';
import { Role } from '@prisma/client';
export declare class RoleRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllRoles(): Promise<Role[]>;
    createRole(createRoleDto: CreateRoleDto): Promise<Role>;
    getRoleByName(roleName: string): Promise<Role | null>;
}
