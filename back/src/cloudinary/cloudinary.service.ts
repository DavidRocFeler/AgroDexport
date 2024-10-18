import { Injectable, BadRequestException } from "@nestjs/common";
import { UploadApiResponse, v2 as Cloudinary } from "cloudinary";
import * as toStream from "buffer-to-stream";
import { UsersRepository } from "../users/users.repository";
// import { UsersRepository } from "../users/users.repository";
// import { CompaniesRepository } from "../companies/companies.repository";
// import { ProductsRepository } from "../company-products/company-products.repository";
// import { FarmerCertificationsRepository } from "../farmer-certifications/farmer-certifications.repository";

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly usersRepository: UsersRepository,
    // private readonly companiesRepository: CompaniesRepository,
    // private readonly productsRepository: CompanyProductsRepository,
    // private readonly farmerCertificationsRepository: FarmerCertificationsRepository,
  ) {}

  async uploadFile(id: string, file: Express.Multer.File, type: string): Promise<{ secure_url: string }> {
    const folder = this.getFolderByType(type);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = Cloudinary.uploader.upload_stream(
        {
          resource_type: "auto", // Manejo automático de imágenes y documentos
          folder,
          public_id: id,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      toStream(file.buffer).pipe(upload);
    });

    const secure_url = result.secure_url;
    await this.updateFileUrl(id, secure_url, type);

    return { secure_url };
  }

  async uploadMultipleFiles(id: string, files: Record<string, Express.Multer.File | undefined>): Promise<{ [key: string]: string }> {
    const uploadPromises = Object.entries(files).map(async ([docType, file]) => {
      if (file) {
        const result = await this.uploadFile(id, file, docType);
        return { [docType]: result.secure_url };
      }
      return null;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    return Object.assign({}, ...uploadedUrls.filter(url => url !== null));
  }

  private getFolderByType(type: string): string {
    switch (type) {
      case 'user':
        return 'users';
      case 'companyLogo':
        return 'companyLogos';
      case 'product':
        return 'products';
      case 'phytosanitary_certificate':
      case 'agricultural_producer_cert':
      case 'organic_certification':
      case 'quality_certificate':
      case 'certificate_of_origin':
        return 'farmerCertifications';
      default:
        throw new BadRequestException('Invalid type for file upload');
    }
  }

  private async updateFileUrl(id: string, url: string, type: string): Promise<void> {
    let updateData: Record<string, string> = {}; 
  
    switch (type) {
      case 'user':
        updateData = { profile_picture: url };
        await this.usersRepository.updateUser(id, updateData);
        break;
  
      case 'companyLogo':
        updateData = { company_logo: url };
        // await this.companiesRepository.updateCompanyLogoFile(id, updateData);
        break;
  
      case 'product':
        updateData = { company_product_img: url };
        // await this.companyProductsRepository.updateProductFile(id, updateData);
        break;
  
      case 'phytosanitary_certificate':
      case 'agricultural_producer_cert':
      case 'organic_certification':
      case 'quality_certificate':
      case 'certificate_of_origin':
        updateData = { [type]: url }; // Asigna `type` dinámicamente como clave
        // await this.farmerCertificationsRepository.updateCertificationFile(id, updateData);
        break;
  
      default:
        throw new BadRequestException('Invalid type for file update');
    }
  }  
}
