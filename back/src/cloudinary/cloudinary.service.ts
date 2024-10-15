import { Injectable, BadRequestException } from "@nestjs/common";
import { UploadApiResponse, v2 as Cloudinary } from "cloudinary";
import * as toStream from "buffer-to-stream";
// import { UsersRepository } from "../users/users.repository";
// import { CompaniesRepository } from "../companies/companies.repository";
// import { ProductsRepository } from "../company-products/company-products.repository";
// import { FarmerCertificationsRepository } from "../farmer-certifications/farmer-certifications.repository";

@Injectable()
export class CloudinaryService {
  constructor(
    // private readonly usersRepository: UsersRepository,
    // private readonly companiesRepository: CompaniesRepository,
    // private readonly productsRepository: CompanyProductsRepository,
    // private readonly farmerCertificationsRepository: FarmerCertificationsRepository,
  ) {}

  async uploadFile(id: string, file: Express.Multer.File, type: string): Promise<{ secure_url: string }> {
    const folder = this.getFolderByType(type);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = Cloudinary.uploader.upload_stream(
        {
          resource_type: "auto", // Permite el manejo automático de imágenes y documentos
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

  private getFolderByType(type: string): string {
    switch (type) {
      case 'user':
        return 'users';
      case 'companyLogo':
        return 'companyLogos';
      case 'product':
        return 'products';
      case 'farmerCertification':
        return 'farmerCertifications';
      default:
        throw new BadRequestException('Invalid type for file upload');
    }
  }

  private async updateFileUrl(id: string, url: string, type: string): Promise<void> {
    switch (type) {
      case 'user':
        // await this.usersRepository.updateUserFile(id, url);
        break;
      case 'companyLogo':
        // await this.companiesRepository.updateCompanyLogoFile(id, url);
        break;
      case 'product':
        // await this.productsRepository.updateProductFile(id, url);
        break;
      case 'farmerCertification':
        // await this.farmerCertificationsRepository.updateCertificationFile(id, url);
        break;
      default:
        throw new BadRequestException('Invalid type for file update');
    }
  }
}
