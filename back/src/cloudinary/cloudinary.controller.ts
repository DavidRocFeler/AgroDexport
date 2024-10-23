import { Controller, Param, ParseUUIDPipe, Post, UploadedFiles, UseInterceptors, MaxFileSizeValidator, FileTypeValidator, UploadedFile, ParseFilePipe, HttpCode, UseGuards } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiParam, ApiConsumes, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { Express } from 'express';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/RolesGuard';

@ApiTags("Cloudinary")
@Controller()
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}


  @ApiBearerAuth()
  @HttpCode(200)
  @Post('/uploadImage/:type/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('supplier', 'buyer')
  @UseInterceptors(FileInterceptor('image'))
  @ApiParam({ name: 'type', description: 'Tipo de imagen (user, companyLogo, companyProduct)', type: 'string' })
  @ApiParam({ name: 'id', description: 'ID del recurso al cual asociar la imagen', type: 'string' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo de imagen (JPG, PNG, o WEBP y menor a 300KB)',
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
  })
  async uploadImage(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile(
        new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({
                maxSize: 300000, // 300KB
                message: 'El archivo debe ser menor a 300KB',
              }),
              new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/, // Solo imágenes JPG, PNG, o WEBP
              }),
            ],
          }),
    ) file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadFile(id, file, type);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Post('/uploadDocuments/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('supplier')
  @UseInterceptors(FilesInterceptor('documents', 5)) // Para recibir múltiples archivos
  @ApiParam({ name: 'id', description: 'ID del recurso al cual asociar los documentos', type: 'string' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivos de documentos (PDF, DOCX, o imágenes JPG, PNG) hasta 2MB cada uno',
    required: true,
    schema: {
      type: 'object',
      properties: {
        phytosanitary_certificate: { type: 'string', format: 'binary' },
        agricultural_producer_cert: { type: 'string', format: 'binary' },
        organic_certification: { type: 'string', format: 'binary'},
        quality_certificate: { type: 'string', format: 'binary' },
        certificate_of_origin: { type: 'string', format: 'binary' },
      },
    },
  })
  async uploadDocuments(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const fileMap = {
      phytosanitary_certificate: files.find(file => file.fieldname === 'phytosanitary_certificate'),
      agricultural_producer_cert: files.find(file => file.fieldname === 'agricultural_producer_cert'),
      organic_certification: files.find(file => file.fieldname === 'organic_certification'),
      quality_certificate: files.find(file => file.fieldname === 'quality_certificate'),
      certificate_of_origin: files.find(file => file.fieldname === 'certificate_of_origin'),
    };

    return this.cloudinaryService.uploadMultipleFiles(id, fileMap);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Post('/uploadImageFront')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin') 
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
      description: 'Image file (any type, validated to ensure it is an image)',
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
  })
  async uploadImageFront(
      @UploadedFile(
          new ParseFilePipe({
              validators: [
                  new MaxFileSizeValidator({
                      maxSize: 5000000, 
                      message: 'File must be smaller than 5MB',
                  }),
                  new FileTypeValidator({
                      fileType: /(jpg|jpeg|png|webp|gif|bmp|tiff|svg)$/, 
                  }),
              ],
          }),
      ) file: Express.Multer.File,
  ) {
      const secureUrl = await this.cloudinaryService.uploadFileToFolder(file); 
      

      return {
          success: true,
          message: 'Image uploaded successfully.',
          secureUrl, 
      };
  }
}
