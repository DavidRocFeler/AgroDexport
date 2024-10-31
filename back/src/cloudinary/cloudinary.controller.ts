import { Controller, Param, ParseUUIDPipe, Post, UploadedFiles, UseInterceptors, MaxFileSizeValidator, FileTypeValidator, UploadedFile, ParseFilePipe, HttpCode, UseGuards, BadRequestException } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
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
  @Roles('admin', 'supplier', 'buyer')
  @UseInterceptors(FileInterceptor('image'))
  @ApiParam({ name: 'type', description: 'Tipo de imagen (user, companyLogo, companyProduct)', type: 'string' })
  @ApiParam({ name: 'id', description: 'ID del recurso al cual asociar la imagen', type: 'string' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo de imagen (JPG, PNG, o WEBP y menor a 2MB)',
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
                maxSize: 2000000, // 300KB
                message: 'El archivo debe ser menor a 2MB',
              }),
              new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/, // Solo imágenes JPG, PNG, o WEBP
              }),
            ],
          }),
    ) file: Express.Multer.File,
  ) {

    console.log('File:', file);
    console.log('Type:', type);
    console.log('ID:', id);
    if (!file) {
      console.error('Archivo no proporcionado');
      throw new BadRequestException('File not provided');
    }
  
    try {
      const uploadResult = await this.cloudinaryService.uploadFile(id, file, type);
      return uploadResult;
    } catch (error) {
      console.error('Error during file upload:', error);
      throw new BadRequestException('Failed to upload file to Cloudinary');
    }
  }





  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier')
@Post(':companyId/:companyProductId')
@UseInterceptors(FileFieldsInterceptor([
  { name: 'phytosanitary_certificate', maxCount: 1 },
  { name: 'agricultural_producer_cert', maxCount: 1 },
  { name: 'organic_certification', maxCount: 1 },
  { name: 'quality_certificate', maxCount: 1 },
  { name: 'certificate_of_origin', maxCount: 1 },
]))
@ApiParam({ name: 'companyId', description: 'ID of the company', type: 'string' })
@ApiParam({ name: 'companyProductId', description: 'ID of the product', type: 'string' })
@ApiConsumes('multipart/form-data')
@ApiBody({
  description: 'Upload specific documents (PDF, DOCX, images) to Cloudinary',
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
})
async uploadDocuments(
  @Param('companyId') companyId: string,
  @Param('companyProductId') companyProductId: string,
  @UploadedFiles() files: {
    phytosanitary_certificate?: Express.Multer.File[],
    agricultural_producer_cert?: Express.Multer.File[],
    organic_certification?: Express.Multer.File[],
    quality_certificate?: Express.Multer.File[],
    certificate_of_origin?: Express.Multer.File[],
  },
) {
  // Verificar si se ha subido al menos un archivo
  const uploadedFiles = Object.values(files).flat().filter(file => file);
  if (uploadedFiles.length === 0) {
    throw new BadRequestException('No files were uploaded.');
  }

  // Crear un fileMap usando los nombres de archivo especificados
  const fileMap: Record<string, Express.Multer.File> = {};
  if (files.phytosanitary_certificate?.[0]) {
    fileMap['phytosanitary_certificate'] = files.phytosanitary_certificate[0];
  }
  if (files.agricultural_producer_cert?.[0]) {
    fileMap['agricultural_producer_cert'] = files.agricultural_producer_cert[0];
  }
  if (files.organic_certification?.[0]) {
    fileMap['organic_certification'] = files.organic_certification[0];
  }
  if (files.quality_certificate?.[0]) {
    fileMap['quality_certificate'] = files.quality_certificate[0];
  }
  if (files.certificate_of_origin?.[0]) {
    fileMap['certificate_of_origin'] = files.certificate_of_origin[0];
  }

  console.log("Archivos recibidos:", fileMap);

  const fileUrls = await this.cloudinaryService.uploadMultipleFiles(companyId, companyProductId, fileMap);

  const savedCertification = await this.cloudinaryService.saveUrlsToDatabase(
    companyId,
    companyProductId,
    fileUrls,
  );

  return {
    message: 'Files uploaded and certification saved successfully!',
    data: savedCertification,
  };
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
