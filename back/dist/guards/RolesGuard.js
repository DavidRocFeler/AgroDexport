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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const prisma_service_1 = require("../prisma/prisma.service");
let RolesGuard = class RolesGuard {
    constructor(reflector, prisma) {
        this.reflector = reflector;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride("roles", [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('RolesGuard: Required roles:', requiredRoles);
        if (!requiredRoles) {
            throw new common_1.ForbiddenException("Roles are required to access this route");
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('RolesGuard: User from request:', user ? user.user_id : 'No user found');
        if (!user || !user.user_id) {
            throw new common_1.ForbiddenException("User ID not found in request");
        }
        console.log('RolesGuard: Fetching user from database with ID:', user.user_id);
        const userWithRole = await this.prisma.user.findUnique({
            where: { user_id: user.user_id },
            include: { role: true },
        });
        if (!userWithRole) {
            throw new common_1.ForbiddenException("User does not exist");
        }
        const userRole = userWithRole.role.role_name;
        console.log('RolesGuard: User role:', userRole);
        const hasRole = requiredRoles.includes(userRole);
        console.log('RolesGuard: User has required role:', hasRole);
        if (!hasRole) {
            throw new common_1.ForbiddenException("You do not have permission to access this route");
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        prisma_service_1.PrismaService])
], RolesGuard);
//# sourceMappingURL=RolesGuard.js.map