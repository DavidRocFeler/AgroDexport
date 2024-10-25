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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_repository_1 = require("../users/users.repository");
const randomPassword_1 = require("../utilities/randomPassword");
const bcrypt = require("bcrypt");
const nodemail_service_1 = require("../nodemail/nodemail.service");
const jwt_1 = require("@nestjs/jwt");
let AuthRepository = class AuthRepository {
    constructor(prisma, userRepository, emailServices, jwtService) {
        this.prisma = prisma;
        this.userRepository = userRepository;
        this.emailServices = emailServices;
        this.jwtService = jwtService;
    }
    async resetPassword(data) {
        const email = data.email;
        const credentials = await this.userRepository.findCredentialByEmail(email);
        if (credentials) {
            const temporalPassword = (0, randomPassword_1.randomPassword)();
            const hashedPassword = await bcrypt.hash(temporalPassword, 10);
            await this.prisma.credential.update({
                where: { email: email },
                data: {
                    password: hashedPassword,
                },
            });
            const subject = "Reset Password Request";
            const text = `
          You got a new temporal password.
          Please change your password as soon as you log in to your account.
          Temporal Password: ${temporalPassword}
        `;
            await this.emailServices.sendResetPasswordEmail(email, subject, text);
            return { message: `An email with a temporal password was sent to ${email}` };
        }
        throw new common_1.NotFoundException('This Email was not found');
    }
    async thirdSingIn(userData) {
        const { email } = userData;
        const credential = await this.userRepository.findCredentialByEmail(email);
        if (credential && credential.user) {
            const { user_id, role } = credential.user;
            const userPayload = {
                sub: user_id,
                user_id,
                role: role ? role.role_name : 'No role',
            };
            console.log(userPayload);
            const token = this.jwtService.sign(userPayload);
            return {
                token,
                user_id,
                role_name: role ? role.role_name : 'No role',
            };
        }
        else {
            throw new common_1.UnauthorizedException('User not found. Please register first.');
        }
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_repository_1.UsersRepository,
        nodemail_service_1.EmailService,
        jwt_1.JwtService])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map