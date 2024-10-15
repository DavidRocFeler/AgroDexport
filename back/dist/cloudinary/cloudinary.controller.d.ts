import { CloudinaryService } from "./cloudinary.service";
export declare class CloudinaryController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadImage(type: string, id: string, file: Express.Multer.File): Promise<{
        secure_url: string;
    }>;
    uploadDocument(type: string, id: string, file: Express.Multer.File): Promise<{
        secure_url: string;
    }>;
}
