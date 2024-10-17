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
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersRepository = class UsersRepository {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async createUser(userData) {
        const { user_name, user_lastname, nDni, birthday, phone, country, role_id, isOlder, email, password } = userData;
        const credentials = await this.findCredentialByEmail(email);
        if (!credentials) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAccount = await this.prisma.credential.create({
                data: {
                    email: email,
                    password: hashedPassword
                }
            });
            const newUser = await this.prisma.user.create({
                data: {
                    user_name: user_name,
                    user_lastname: user_lastname,
                    nDni: nDni,
                    birthday: birthday,
                    phone: phone,
                    country: country,
                    isOlder: isOlder,
                    role_id: role_id,
                    credential_id: newAccount.credential_id
                }
            });
            return newUser;
        }
        else {
            throw new common_1.BadRequestException("The email is already in use");
        }
    }
    async updateUser(id, userData) {
        const { user_name, user_lastname, nDni, birthday, phone, country, role_id, isOlder, profile_picture } = userData;
        const user = await this.prisma.user.findUnique({
            where: { user_id: id }
        });
        if (user) {
            user.user_name = user_name;
            user.birthday = birthday;
            user.country = country;
            user.isOlder = isOlder;
            user.nDni = nDni;
            user.phone = phone;
            user.user_lastname = user_lastname;
            user.role_id = role_id;
            user.profile_picture = profile_picture;
        }
    }
    async singIn(credentials) {
        const { email, password } = credentials;
        const account = await this.findCredentialByEmail(email);
        if (account) {
            const user = await this.findUserByCredentialId(account.credential_id);
            const userId = user.user_id;
            const accountPassword = account.password;
            const isPasswordValid = await bcrypt.compare(password, accountPassword);
            if (isPasswordValid) {
                const userPayload = {
                    sub: userId,
                    id: userId,
                    userName: user.user_name
                };
                const token = this.jwtService.sign(userPayload);
                return { token, };
            }
        }
        else {
            throw new common_1.BadRequestException("Your password or Email is incorrect");
        }
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
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map