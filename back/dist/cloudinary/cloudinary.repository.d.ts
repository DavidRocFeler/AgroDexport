import { PrismaService } from '../prisma/prisma.service';
export declare class CloudinaryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updateUserProfilePicture(userId: string, url: string): Promise<void>;
    updateCompanyLogo(companyId: string, url: string): Promise<void>;
    updateProductImage(productId: string, url: string): Promise<void>;
}
