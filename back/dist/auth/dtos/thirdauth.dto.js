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
exports.thirdAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class thirdAuthDto {
}
exports.thirdAuthDto = thirdAuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Email del usuario", example: "user@example.com" }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo email no debe estar vacío' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Debe ser un email válido' }),
    __metadata("design:type", String)
], thirdAuthDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Nombre del usuario", example: "Juan Pérez" }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo name no debe estar vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo name debe ser un string' }),
    __metadata("design:type", String)
], thirdAuthDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Role asociado al usuario", example: "buyer", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El campo role_name debe ser un string' }),
    __metadata("design:type", String)
], thirdAuthDto.prototype, "role_name", void 0);
//# sourceMappingURL=thirdauth.dto.js.map