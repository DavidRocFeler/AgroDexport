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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryController = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("./cloudinary.service");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
let CloudinaryController = class CloudinaryController {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async uploadImage(type, id, file) {
        return this.cloudinaryService.uploadFile(id, file, type);
    }
    async uploadDocuments(id, files) {
        const fileMap = {
            phytosanitary_certificate: files.find(file => file.fieldname === 'phytosanitary_certificate'),
            agricultural_producer_cert: files.find(file => file.fieldname === 'agricultural_producer_cert'),
            organic_certification: files.find(file => file.fieldname === 'organic_certification'),
            quality_certificate: files.find(file => file.fieldname === 'quality_certificate'),
            certificate_of_origin: files.find(file => file.fieldname === 'certificate_of_origin'),
        };
        return this.cloudinaryService.uploadMultipleFiles(id, fileMap);
    }
};
exports.CloudinaryController = CloudinaryController;
__decorate([
    (0, common_1.Post)('/uploadImage/:type/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiParam)({ name: 'type', description: 'Tipo de imagen (user, companyLogo, companyProduct)', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del recurso al cual asociar la imagen', type: 'string' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Archivo de imagen (JPG, PNG, o WEBP y menor a 200KB)',
        required: true,
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary'
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CloudinaryController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('/uploadDocuments/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('documents', 5)),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del recurso al cual asociar los documentos', type: 'string' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Archivos de documentos (PDF, DOCX, o imágenes JPG, PNG) hasta 2MB cada uno',
        required: true,
        schema: {
            type: 'object',
            properties: {
                phytosanitary_certificate: { type: 'string', format: 'binary' },
                agricultural_producer_cert: { type: 'string', format: 'binary' },
                organic_certification: { type: 'string', format: 'binary' },
                quality_certificate: { type: 'string', format: 'binary' },
                certificate_of_origin: { type: 'string', format: 'binary' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], CloudinaryController.prototype, "uploadDocuments", null);
exports.CloudinaryController = CloudinaryController = __decorate([
    (0, swagger_1.ApiTags)("Cloudinary"),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService])
], CloudinaryController);
//# sourceMappingURL=cloudinary.controller.js.map