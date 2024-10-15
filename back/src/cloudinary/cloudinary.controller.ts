import { Controller, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors, BadRequestException, MaxFileSizeValidator, FileTypeValidator } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiParam, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { Express } from 'express';

@ApiTags("Cloudinary")
@Controller()
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('/uploadImage/:type/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiParam({ name: 'type', description: 'Tipo de imagen (user, companyLogo, companyProduct)', type: 'string' })
  @ApiParam({ name: 'id', description: 'ID del recurso al cual asociar la imagen', type: 'string' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
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
  })
  async uploadImage(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 200000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      })
    ) file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadFile(id, file, type);
  }

  @Post('/uploadDocument/:type/:id')
  @UseInterceptors(FileInterceptor('document'))
  @ApiParam({ name: 'type', description: 'Tipo de documento (farmerCertification)', type: 'string' })
  @ApiParam({ name: 'id', description: 'ID del recurso al cual asociar el documento', type: 'string' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo de documento (PDF, DOCX, o imágenes JPG, PNG) hasta 2MB',
    required: true,
    schema: {
      type: 'object',
      properties: {
        document: { 
            type: 'string', 
            format: 'binary' 
        },
      },
    },
  })
  async uploadDocument(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000000 }), // 2MB para documentos
          new FileTypeValidator({ fileType: /(pdf|docx|jpg|jpeg|png)$/ }),
        ],
      })
    ) file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadFile(id, file, type);
  }
}
