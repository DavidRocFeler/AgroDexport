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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../../decorators/match.decorator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User first name', maxLength: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The first name should only contain letters and no spaces' }),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "user_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User last name', maxLength: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The last name should only contain letters and no spaces' }),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "user_lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User email', maxLength: 255 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 15),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/, {
        message: 'The password must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !@#$%^&*',
    }),
    (0, swagger_1.ApiProperty)({
        description: "The user's password. Must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !@#$%^&*",
        example: "Test123!",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(match_decorator_1.MatchPassword, ['password']),
    (0, swagger_1.ApiProperty)({
        description: "Must match the password field",
        example: "Test123!",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isOlder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User DNI number', example: 12345678 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "nDni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User's date of birth", example: '1990-01-01' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User phone number', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User country', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "profile_picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Role ID associated with the user", example: "role-uuid-id" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role_id", void 0);
//# sourceMappingURL=createUser.dto.js.map