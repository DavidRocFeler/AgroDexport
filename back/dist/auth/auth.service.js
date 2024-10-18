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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const validation_helper_1 = require("../helpers/validation.helper");
const users_repository_1 = require("../users/users.repository");
let AuthService = class AuthService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async signUpService(userData) {
        const user = {
            user_name: userData.user_name,
            user_lastname: userData.user_lastname,
            nDni: userData.nDni,
            birthday: userData.birthday,
            phone: userData.phone,
            country: userData.country,
            role_id: userData.role_id,
        };
        const newUser = await this.usersRepository.createUser(user, userData.email, userData.password);
        return newUser;
    }
    async signInService(loginUserDto) {
        const { email, password } = loginUserDto;
        const credential = await this.usersRepository.findCredentialByEmail(email);
        (0, validation_helper_1.validateExists)(credential, 'notExists', 'Incorrect credentials');
        if (credential.password !== password) {
            throw new common_1.UnauthorizedException('Incorrect credentials');
        }
        const user = await this.usersRepository.findUserByCredentialId(credential.credential_id);
        (0, validation_helper_1.validateExists)(user, 'notExists', 'User not found');
        return { message: 'Login successful', user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map