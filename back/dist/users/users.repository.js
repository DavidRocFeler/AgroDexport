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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const validation_helper_1 = require("../helpers/validation.helper");
let UsersRepository = class UsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(user, email, password) {
        const checkEmail = await this.findCredentialByEmail(email);
        (0, validation_helper_1.validateExists)(checkEmail, 'exists', 'Email already exists');
        if (user.nDni) {
            const checkDni = await this.prisma.user.findUnique({
                where: { nDni: user.nDni },
            });
            (0, validation_helper_1.validateExists)(checkDni, 'exists', 'DNI already exists');
        }
        const newCredential = await this.prisma.credential.create({
            data: {
                email: email,
                password: password,
            },
        });
        const newUser = await this.prisma.user.create({
            data: {
                ...user,
                credential_id: newCredential.credential_id,
            },
        });
        return newUser;
    }
    async findCredentialByEmail(email) {
        return this.prisma.credential.findUnique({
            where: { email },
        });
    }
    async findUserByCredentialId(credential_id) {
        return this.prisma.user.findUnique({
            where: { credential_id },
        });
    }
    async findUserByEmail(email) {
        const credential = await this.prisma.credential.findUnique({
            where: { email },
            include: { user: true },
        });
        return credential?.user || null;
    }
    async findCommission() {
        return this.prisma.commission.findFirst();
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map