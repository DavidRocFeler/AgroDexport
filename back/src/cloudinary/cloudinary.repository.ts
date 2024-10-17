import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { validateExists } from '../helpers/validation.helper'; 

@Injectable()
export class CloudinaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserProfilePicture(userId: string, url: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { user_id: userId } });
    validateExists(user, 'notExists', 'User not found');
    await this.prisma.user.update({
      where: { user_id: userId },
      data: { profile_picture: url },
    });
  }

  async updateCompanyLogo(companyId: string, url: string): Promise<void> {
    const company = await this.prisma.company.findUnique({ where: { company_id: companyId } });
    validateExists(company, 'notExists', 'Company not found');
    await this.prisma.company.update({
      where: { company_id: companyId },
      data: { company_logo: url },
    });
  }

  async updateProductImage(productId: string, url: string): Promise<void> {
    const product = await this.prisma.companyProduct.findUnique({ where: { company_product_id: productId } });
    validateExists(product, 'notExists', 'Product not found');
    await this.prisma.companyProduct.update({
      where: { company_product_id: productId },
      data: { company_product_img: url },
    });
  }
}
