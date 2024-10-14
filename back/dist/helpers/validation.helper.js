"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExists = validateExists;
exports.validateRequestBodyNotEmpty = validateRequestBodyNotEmpty;
const common_1 = require("@nestjs/common");
function validateExists(value, type, message) {
    if (type === 'exists' && value) {
        throw new common_1.BadRequestException(message);
    }
    if (type === 'notExists' && !value) {
        throw new common_1.BadRequestException(message);
    }
}
function validateRequestBodyNotEmpty(updateData) {
    if (!Object.keys(updateData).length) {
        throw new common_1.BadRequestException('El cuerpo de la solicitud no puede estar vacío');
    }
}
//# sourceMappingURL=validation.helper.js.map