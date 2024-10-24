"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoleRepository = class RoleRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllRoles() {
        return this.prisma.role.findMany();
    }
    async createRole(createRoleDto) {
        return this.prisma.role.create({
            data: {
                role_name: createRoleDto.role_name,
                role_description: createRoleDto.role_description,
            },
        });
    }
    async getRoleByName(roleName) {
        return this.prisma.role.findFirst({
            where: { role_name: roleName },
        });
    }
};
exports.RoleRepository = RoleRepository;
exports.RoleRepository = RoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoleRepository);
//# sourceMappingURL=roles.repository.js.map