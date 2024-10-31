import { Injectable, BadRequestException } from "@nestjs/common";
import { UploadApiResponse, v2 as Cloudinary } from "cloudinary";
import * as toStream from "buffer-to-stream";
import { UsersRepository } from "../users/users.repository";
import { CompanyRepository } from "../companies/companies.repository"
import { CompanyProductsRepository } from "../company-products/company-products.repository";
import { FarmerCertificationRepository } from "../farmer-certifications/farmer-certifications.repository";
import { CreateFarmerCertificationDto } from "../farmer-certifications/farmer-certifications.dto";

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly companiesRepository: CompanyRepository,
    private readonly productsRepository: CompanyProductsRepository,
    private readonly farmerCertificationsRepository: FarmerCertificationRepository,
  ) {}

  async uploadFile(id: string, file: Express.Multer.File, type: string): Promise<{ secure_url: string }> {
    const folder = this.getFolderByType(type);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = Cloudinary.uploader.upload_stream(
        {
          resource_type: "image", 
          folder,
          public_id: id,
        },
        (error, result) => {
          if (error) {
            console.error('Error during upload to Cloudinary:', error);
            reject(new BadRequestException('Error uploading file to Cloudinary'));
          } else {
            resolve(result);
          }
        }
      );
      toStream(file.buffer).pipe(upload);
    });

    const secure_url = result.secure_url;
    await this.updateImageUrl(id, secure_url, type);

    return { secure_url };
  }

  private getFolderByType(type: string): string {
    switch (type) {
      case 'user':
        return 'users';
      case 'companyLogo':
        return 'companyLogos';
      case 'product':
        return 'products';
      default:
        throw new BadRequestException('Invalid type for file upload');
    }
  }

  private async updateImageUrl(id: string, url: string, type: string): Promise<void> {
    let updateData: Record<string, string> = {};

    switch (type) {
        case 'user':
            updateData = { profile_picture: url };
            await this.usersRepository.updateUser(id, updateData);
            break;

        case 'companyLogo':
            updateData = { company_logo: url };
            await this.companiesRepository.update(id, updateData);
            break;

        case 'product':
            updateData = { company_product_img: url };
            await this.productsRepository.updateProductRepository(id, updateData);
            break;

        default:
            throw new BadRequestException('Invalid type for image update');
    }
}

// private async updateCertificationFileUrl(companyId: string, productId: string, url: string, type: string): Promise<void> {

//   const updateData: CreateFarmerCertificationDto = {
//       company_id: companyId,
//       phytosanitary_certificate: '', 
//       agricultural_producer_cert: '', 
//       organic_certification: '', 
//       quality_certificate: '', 
//       certificate_of_origin: '', 
//       company_product_ids: [productId], 
//   };

//   switch (type) {
//       case 'phytosanitary_certificate':
//           updateData.phytosanitary_certificate = url;
//           break;
//       case 'agricultural_producer_cert':
//           updateData.agricultural_producer_cert = url;
//           break;
//       case 'organic_certification':
//           updateData.organic_certification = url;
//           break;
//       case 'quality_certificate':
//           updateData.quality_certificate = url;
//           break;
//       case 'certificate_of_origin':
//           updateData.certificate_of_origin = url;
//           break;
//       default:
//           throw new BadRequestException('Invalid type for certification update');
//   }
// console.log("antes de crear", updateData);
//   await this.farmerCertificationsRepository.create(updateData);
// }


  async uploadFileToFolder(file: Express.Multer.File) {
    const folder = 'Front'; 

    return new Promise<string>((resolve, reject) => {
        Cloudinary.uploader.upload_stream(
            {
                folder, 
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result.secure_url);
            },
        ).end(file.buffer); 
    });
}








async saveUrlsToDatabase(
  companyId: string,
  companyProductId: string,
  fileUrls: Record<string, string>,
): Promise<CreateFarmerCertificationDto> {
  // Crear el objeto DTO para guardar en la base de datos
  const updateData: CreateFarmerCertificationDto = {
    company_id: companyId,
    phytosanitary_certificate: fileUrls.phytosanitary_certificate || null,
    agricultural_producer_cert: fileUrls.agricultural_producer_cert || null,
    organic_certification: fileUrls.organic_certification || null,
    quality_certificate: fileUrls.quality_certificate || null,
    certificate_of_origin: fileUrls.certificate_of_origin || null,
    company_product_ids: [companyProductId], // Asegurar que se incluya company_product_ids
  };

  // Guardar en la base de datos
  await this.farmerCertificationsRepository.create(updateData);

  // Retornar el DTO que se acaba de crear para cumplir con el tipo de retorno
  return updateData;
}

// Método existente para subir múltiples archivos (sin cambios)
async uploadMultipleFiles(
  companyId: string,
  companyProductId: string,
  fileMap: Record<string, Express.Multer.File>,
): Promise<Record<string, string>> {
  const fileUrls: Record<string, string> = {};

  for (const [key, file] of Object.entries(fileMap)) {
    try {
      const result = await this.uploadFileToCloudinary(file, companyId, companyProductId);
      fileUrls[key] = result.url;
    } catch (error) {
      throw new BadRequestException(`Failed to upload ${key}: ${error.message}`);
    }
  }

  return fileUrls;
}

// Método para subir un archivo a Cloudinary (sin cambios)
private async uploadFileToCloudinary(
  file: Express.Multer.File,
  companyId: string,
  companyProductId: string,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    Cloudinary.uploader.upload_stream(
      {
        folder: `companies/${companyId}/products/${companyProductId}`,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    ).end(file.buffer);
  });
}
}
