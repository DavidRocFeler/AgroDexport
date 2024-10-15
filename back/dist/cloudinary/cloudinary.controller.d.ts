import { CloudinaryService } from "./cloudinary.service";
export declare class CloudinaryController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadImage(type: string, id: string, file: Express.Multer.File): Promise<{
        secure_url: string;
    }>;
    uploadDocuments(id: string, files: Express.Multer.File[]): Promise<{
        [key: string]: string;
    }>;
}
